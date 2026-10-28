import type { ReactNode } from 'react'

interface StateMessageProps {
  title: string
  description?: string
  action?: ReactNode
  tone?: 'neutral' | 'error'
}

/** Mensagem padrão para estados vazios e de erro. */
export function StateMessage({ title, description, action, tone = 'neutral' }: StateMessageProps) {
  return (
    <div className={`state state-${tone}`} role={tone === 'error' ? 'alert' : undefined}>
      <h2 className="state-title">{title}</h2>
      {description && <p className="muted">{description}</p>}
      {action}
    </div>
  )
}
