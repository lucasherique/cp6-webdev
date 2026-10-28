import { Link } from 'react-router-dom'
import { formatDate } from '../../lib/format'
import { Skeleton } from '../ui/Skeleton'
import type { Repo } from '../../types'

export function ProjectCard({ repo }: { repo: Repo }) {
  return (
    <Link to={`/projetos/${repo.name}`} className="card project-card">
      <h3 className="card-title">{repo.name}</h3>
      <p className="muted card-desc">{repo.description ?? 'Sem descrição no GitHub.'}</p>
      <p className="card-meta">
        {repo.language && <span className="lang">{repo.language}</span>}
        <span>Atualizado em {formatDate(repo.updatedAt)}</span>
        {repo.stars > 0 && <span>{repo.stars} estrelas</span>}
      </p>
    </Link>
  )
}

/** Mesmas dimensões do card real, para não haver salto de layout. */
export function ProjectCardSkeleton() {
  return (
    <div className="card project-card" aria-hidden="true">
      <Skeleton width="60%" height="1.4rem" />
      <Skeleton width="100%" height="3rem" />
      <Skeleton width="80%" height="1rem" />
    </div>
  )
}
