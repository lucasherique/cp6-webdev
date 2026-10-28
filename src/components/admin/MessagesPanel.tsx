import { useMessages, useToggleReplied } from '../../hooks/useMessages'
import { formatDateTime } from '../../lib/format'
import { Button } from '../ui/Button'
import { Spinner } from '../ui/Spinner'
import { StateMessage } from '../ui/StateMessage'

export function MessagesPanel() {
  const { data, isLoading, error, refetch } = useMessages()
  const toggle = useToggleReplied()

  if (isLoading) return <Spinner label="Carregando mensagens" />
  if (error) {
    return (
      <StateMessage
        tone="error"
        title="Não foi possível carregar as mensagens"
        description="Confira a conexão com o Supabase e as políticas de acesso (supabase/schema.sql)."
        action={<Button onClick={() => refetch()}>Tentar de novo</Button>}
      />
    )
  }
  if (!data || data.length === 0) {
    return (
      <StateMessage
        title="Nenhuma mensagem ainda"
        description="Quando alguém enviar o formulário de contato, a mensagem aparece aqui."
      />
    )
  }

  return (
    <ul className="list">
      {data.map((m) => (
        <li key={m.id} className={`card message ${m.replied ? 'message-done' : ''}`}>
          <div className="message-head">
            <strong>{m.name}</strong>
            <a href={`mailto:${m.email}`}>{m.email}</a>
            <span className="muted">{formatDateTime(m.created_at)}</span>
          </div>
          <p>{m.message}</p>
          <Button
            variant="ghost"
            loading={toggle.isPending && toggle.variables?.id === m.id}
            onClick={() => toggle.mutate({ id: m.id, replied: !m.replied })}
          >
            {m.replied ? 'Marcar como pendente' : 'Marcar como respondida'}
          </Button>
        </li>
      ))}
    </ul>
  )
}
