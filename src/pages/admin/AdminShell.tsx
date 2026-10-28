import { Outlet } from 'react-router-dom'
import { AuthProvider } from '../../context/AuthProvider'

/** O Supabase e a autenticação só carregam nas rotas /login e /admin. */
export default function AdminShell() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  )
}
