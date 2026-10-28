import { createBrowserRouter } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import HomePage from './pages/HomePage'
import RouteError from './pages/RouteError'

/** Cada página (exceto a home) vira um pacote separado, baixado sob demanda. */
const page = (load: () => Promise<{ default: React.ComponentType }>) => ({
  lazy: async () => ({ Component: (await load()).default }),
})

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <RouteError />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'projetos', ...page(() => import('./pages/ProjectsPage')) },
      { path: 'projetos/:name', ...page(() => import('./pages/ProjectDetailPage')) },
      { path: 'contato', ...page(() => import('./pages/ContactPage')) },
      {
        ...page(() => import('./pages/admin/AdminShell')),
        children: [
          { path: 'login', ...page(() => import('./pages/admin/LoginPage')) },
          { path: 'admin', ...page(() => import('./pages/admin/DashboardPage')) },
        ],
      },
      { path: '*', ...page(() => import('./pages/NotFoundPage')) },
    ],
  },
])
