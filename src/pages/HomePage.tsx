import { ButtonLink } from '../components/ui/Button'
import { OptimizedImage } from '../components/ui/OptimizedImage'
import { TagList } from '../components/ui/TagList'
import { InfoGrid } from '../components/ui/InfoGrid'
import { HeroVisual } from '../components/three/HeroVisual'
import { ProjectGrid } from '../components/projects/ProjectGrid'
import { useFeaturedRepos } from '../hooks/useFeatured'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { siteConfig } from '../config/site'

export default function HomePage() {
  useDocumentTitle('Início')
  const featured = useFeaturedRepos(3)

  return (
    <>
      <section className="hero">
        <div className="hero-text">
          <p className="muted">{siteConfig.role}</p>
          <h1>{siteConfig.headline}</h1>
          <p className="lead">{siteConfig.bio}</p>
          <div className="actions">
            <ButtonLink to="/projetos">Ver projetos</ButtonLink>
            <ButtonLink to="/contato" variant="ghost">
              Entrar em contato
            </ButtonLink>
          </div>
        </div>
        <HeroVisual />
      </section>

      <section className="section" aria-labelledby="destaques">
        <div className="section-head">
          <h2 id="destaques">Projetos em destaque</h2>
          <ButtonLink to="/projetos" variant="ghost">
            Ver todos
          </ButtonLink>
        </div>
        <ProjectGrid
          repos={featured.data}
          isLoading={featured.isLoading}
          error={featured.error}
          onRetry={() => featured.refetch()}
        />
      </section>

      <section className="section about" aria-labelledby="sobre">
        <OptimizedImage
          className="avatar"
          src="/avatar-lh.svg"
          alt={`Monograma de ${siteConfig.name}`}
          width={120}
          height={120}
        />
        <div>
          <h2 id="sobre">Sobre</h2>
          <p className="lead">{siteConfig.bio}</p>
        </div>
      </section>

      <section className="section" aria-labelledby="skills">
        <h2 id="skills">Skills</h2>
        <TagList items={siteConfig.skills} />
      </section>

      <section className="section" aria-labelledby="academicos">
        <h2 id="academicos">Projetos acadêmicos</h2>
        <InfoGrid items={siteConfig.academicProjects} />
      </section>

      <section className="section" aria-labelledby="eventos">
        <h2 id="eventos">Eventos</h2>
        <InfoGrid items={siteConfig.events} />
      </section>
    </>
  )
}
