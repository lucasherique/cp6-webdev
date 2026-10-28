import { env } from '../lib/env'
import { siteConfig } from '../config/site'
import type { Repo } from '../types'

export type GitHubErrorKind =
  'rate-limit' | 'user-not-found' | 'not-configured' | 'network' | 'unknown'

export class GitHubError extends Error {
  kind: GitHubErrorKind
  constructor(kind: GitHubErrorKind) {
    super(kind)
    this.kind = kind
  }
}

interface ApiRepo {
  id: number
  name: string
  description: string | null
  language: string | null
  pushed_at: string
  updated_at: string
  stargazers_count: number
  html_url: string
  homepage: string | null
  topics?: string[]
  fork: boolean
  archived: boolean
}

export async function fetchRepos(signal?: AbortSignal): Promise<Repo[]> {
  const user = env.githubUsername
  if (!user) throw new GitHubError('not-configured')

  let res: Response
  try {
    res = await fetch(
      `https://api.github.com/users/${user}/repos?per_page=100&sort=pushed&type=owner`,
      { signal, headers: { Accept: 'application/vnd.github+json' } },
    )
  } catch {
    throw new GitHubError('network')
  }

  if (res.status === 404) throw new GitHubError('user-not-found')
  if (res.status === 403 || res.status === 429) throw new GitHubError('rate-limit')
  if (!res.ok) throw new GitHubError('unknown')

  const data = (await res.json()) as ApiRepo[]
  return data
    .filter(
      (r) =>
        !r.fork &&
        !r.archived &&
        r.name.toLowerCase() !== user.toLowerCase() &&
        !siteConfig.hiddenRepos.some((h) => h.toLowerCase() === r.name.toLowerCase()),
    )
    .map((r) => ({
      id: r.id,
      name: r.name,
      description: r.description,
      language: r.language,
      updatedAt: r.pushed_at ?? r.updated_at,
      stars: r.stargazers_count,
      url: r.html_url,
      homepage: r.homepage || null,
      topics: r.topics ?? [],
    }))
}
