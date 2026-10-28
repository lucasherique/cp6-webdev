import { Link } from 'react-router-dom'
import { env } from '../../lib/env'
import { siteConfig } from '../../config/site'

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p className="muted">
          {siteConfig.name} · {new Date().getFullYear()}
        </p>
        <p>
          {env.githubUsername && (
            <a href={`https://github.com/${env.githubUsername}`} target="_blank" rel="noreferrer">
              GitHub
            </a>
          )}{' '}
          <a href={`mailto:${siteConfig.email}`}>E-mail</a>{' '}
          <a href={siteConfig.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>{' '}
          <Link to="/admin">Área do dono</Link>
        </p>
      </div>
    </footer>
  )
}
