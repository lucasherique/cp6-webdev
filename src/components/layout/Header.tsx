import { Link, NavLink } from 'react-router-dom'
import { useTheme } from '../../context/theme-context'
import { siteConfig } from '../../config/site'

export function Header() {
  const { theme, toggleTheme } = useTheme()
  const next = theme === 'dark' ? 'claro' : 'escuro'

  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="brand">
          {siteConfig.name}
        </Link>
        <nav aria-label="Principal" className="nav">
          <NavLink to="/" end>
            Início
          </NavLink>
          <NavLink to="/projetos">Projetos</NavLink>
          <NavLink to="/contato">Contato</NavLink>
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Ativar tema ${next}`}
          >
            {theme === 'dark' ? 'Tema claro' : 'Tema escuro'}
          </button>
        </nav>
      </div>
    </header>
  )
}
