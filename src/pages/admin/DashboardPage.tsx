import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ProtectedRoute } from '../../components/auth/ProtectedRoute'
import { MessagesPanel } from '../../components/admin/MessagesPanel'
import { FeaturedPanel } from '../../components/admin/FeaturedPanel'
import { Button } from '../../components/ui/Button'
import { useAuth } from '../../context/auth-context'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'

type Tab = 'messages' | 'featured'

function Dashboard() {
  useDocumentTitle('Dashboard')
  const { email, signOut } = useAuth()
  const navigate = useNavigate()
  const [tab, setTab] = useState<Tab>('messages')

  return (
    <section className="section">
      <div className="section-head">
        <h1>Dashboard</h1>
        <div className="actions">
          <span className="muted">{email}</span>
          <Button
            variant="ghost"
            onClick={async () => {
              await signOut()
              navigate('/')
            }}
          >
            Sair
          </Button>
        </div>
      </div>

      <div role="tablist" className="tabs" aria-label="Seções do dashboard">
        <button role="tab" aria-selected={tab === 'messages'} onClick={() => setTab('messages')}>
          Mensagens
        </button>
        <button role="tab" aria-selected={tab === 'featured'} onClick={() => setTab('featured')}>
          Projetos em destaque
        </button>
      </div>

      {tab === 'messages' ? <MessagesPanel /> : <FeaturedPanel />}
    </section>
  )
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  )
}
