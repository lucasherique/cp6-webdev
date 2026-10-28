import { ButtonLink, Button } from '../ui/Button'
import { StateMessage } from '../ui/StateMessage'
import { ProjectCard, ProjectCardSkeleton } from './ProjectCard'
import { describeGitHubError } from './describeGitHubError'
import type { Repo } from '../../types'

interface ProjectGridProps {
  repos: Repo[] | undefined
  isLoading: boolean
  error: unknown
  onRetry: () => void
  skeletonCount?: number
}

export function ProjectGrid({
  repos,
  isLoading,
  error,
  onRetry,
  skeletonCount = 3,
}: ProjectGridProps) {
  if (isLoading) {
    return (
      <div className="grid" aria-busy="true">
        {Array.from({ length: skeletonCount }, (_, i) => (
          <ProjectCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <StateMessage
        tone="error"
        title="Os projetos não carregaram"
        description={describeGitHubError(error)}
        action={<Button onClick={onRetry}>Tentar de novo</Button>}
      />
    )
  }

  if (!repos || repos.length === 0) {
    return (
      <StateMessage
        title="Nenhum projeto público ainda"
        description="Quando houver repositórios públicos no GitHub, eles aparecem aqui."
        action={
          <ButtonLink to="/contato" variant="ghost">
            Falar comigo
          </ButtonLink>
        }
      />
    )
  }

  return (
    <div className="grid">
      {repos.map((repo) => (
        <ProjectCard key={repo.id} repo={repo} />
      ))}
    </div>
  )
}
