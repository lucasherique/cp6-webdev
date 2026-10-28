import { Link, useParams } from 'react-router-dom'
import { Button, ButtonLink, ExternalButtonLink } from '../components/ui/Button'
import { Skeleton } from '../components/ui/Skeleton'
import { StateMessage } from '../components/ui/StateMessage'
import { describeGitHubError } from '../components/projects/describeGitHubError'
import { useRepo } from '../hooks/useRepos'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { formatDate } from '../lib/format'

export default function ProjectDetailPage() {
  const { name } = useParams()
  const { repo, isLoading, error, refetch } = useRepo(name)
  useDocumentTitle(repo?.name ?? 'Projeto')

  if (isLoading) {
    return (
      <section className="section" aria-busy="true">
        <Skeleton width="40%" height="2.5rem" />
        <Skeleton width="100%" height="4rem" />
        <Skeleton width="30%" height="1.2rem" />
      </section>
    )
  }

  if (error) {
    return (
      <StateMessage
        tone="error"
        title="O projeto não carregou"
        description={describeGitHubError(error)}
        action={<Button onClick={() => refetch()}>Tentar de novo</Button>}
      />
    )
  }

  if (!repo) {
    return (
      <StateMessage
        title="Projeto não encontrado"
        description={`Não existe um repositório público chamado "${name}".`}
        action={<ButtonLink to="/projetos">Ver todos os projetos</ButtonLink>}
      />
    )
  }

  return (
    <article className="section">
      <p>
        <Link to="/projetos">Voltar para projetos</Link>
      </p>
      <h1>{repo.name}</h1>
      <p className="lead">{repo.description ?? 'Sem descrição no GitHub.'}</p>
      <ul className="facts">
        {repo.language && <li>Linguagem: {repo.language}</li>}
        <li>Última atualização: {formatDate(repo.updatedAt)}</li>
        <li>Estrelas: {repo.stars}</li>
      </ul>
      {repo.topics.length > 0 && (
        <ul className="tags">
          {repo.topics.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      )}
      <div className="actions">
        <ExternalButtonLink href={repo.url}>Ver código no GitHub</ExternalButtonLink>
        {repo.homepage && (
          <ExternalButtonLink href={repo.homepage} variant="ghost">
            Ver projeto no ar
          </ExternalButtonLink>
        )}
      </div>
    </article>
  )
}
