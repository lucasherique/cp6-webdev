import { ProjectGrid } from '../components/projects/ProjectGrid'
import { useRepos } from '../hooks/useRepos'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function ProjectsPage() {
  useDocumentTitle('Projetos')
  const { data, isLoading, error, refetch } = useRepos()

  return (
    <section className="section">
      <h1>Projetos</h1>
      <p className="lead muted">Repositórios públicos carregados direto do GitHub.</p>
      <ProjectGrid
        repos={data}
        isLoading={isLoading}
        error={error}
        onRetry={() => refetch()}
        skeletonCount={6}
      />
    </section>
  )
}
