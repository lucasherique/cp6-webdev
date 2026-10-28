import { useQuery } from '@tanstack/react-query'
import { GitHubError, fetchRepos } from '../services/github'

const THIRTY_MINUTES = 30 * 60_000

/** Uma única chave de cache: navegar entre páginas não repete a chamada ao GitHub. */
export function useRepos() {
  return useQuery({
    queryKey: ['github-repos'],
    queryFn: ({ signal }) => fetchRepos(signal),
    staleTime: THIRTY_MINUTES,
    gcTime: THIRTY_MINUTES * 2,
    retry: (count, error) => !(error instanceof GitHubError) && count < 1,
  })
}

export function useRepo(name: string | undefined) {
  const query = useRepos()
  const repo = query.data?.find((r) => r.name === name)
  return { ...query, repo }
}
