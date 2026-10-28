import { Outlet, useNavigation } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'

export function Layout() {
  const navigation = useNavigation()
  return (
    <>
      <a href="#conteudo" className="skip-link">
        Ir para o conteúdo
      </a>
      <div className={`progress ${navigation.state === 'loading' ? 'progress-on' : ''}`} />
      <Header />
      <main id="conteudo" className="container main">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
