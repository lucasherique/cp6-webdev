import { useState, type FormEvent } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/auth-context'
import { Button } from '../../components/ui/Button'
import { Spinner } from '../../components/ui/Spinner'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'

export default function LoginPage() {
  useDocumentTitle('Entrar')
  const { status, signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: string } | null)?.from ?? '/admin'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (status === 'loading') return <Spinner label="Verificando acesso" />
  if (status === 'authenticated') return <Navigate to={from} replace />

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      await signIn(email, password)
      navigate(from, { replace: true })
    } catch {
      setError('E-mail ou senha incorretos, ou o Supabase não está configurado.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="section narrow">
      <h1>Área do dono</h1>
      <form onSubmit={onSubmit} className="form">
        <div className="field">
          <label htmlFor="login-email">E-mail</label>
          <input
            id="login-email"
            type="email"
            autoComplete="username"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="login-password">Senha</label>
          <input
            id="login-password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type="submit" loading={submitting}>
          Entrar
        </Button>
        {error && (
          <p className="feedback feedback-error" role="alert">
            {error}
          </p>
        )}
      </form>
    </section>
  )
}
