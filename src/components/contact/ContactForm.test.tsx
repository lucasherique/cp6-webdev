import { describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ContactForm } from './ContactForm'

async function fill(user: ReturnType<typeof userEvent.setup>, values: Record<string, string>) {
  if (values.name !== undefined) await user.type(screen.getByLabelText('Nome'), values.name)
  if (values.email !== undefined) await user.type(screen.getByLabelText('E-mail'), values.email)
  if (values.message !== undefined)
    await user.type(screen.getByLabelText('Mensagem'), values.message)
}

describe('ContactForm', () => {
  it('mostra mensagens de erro por campo e não envia dados inválidos', async () => {
    const onSubmit = vi.fn()
    const user = userEvent.setup()
    render(<ContactForm onSubmit={onSubmit} />)

    await fill(user, { name: 'A', email: 'sem-arroba', message: 'curta' })
    await user.click(screen.getByRole('button', { name: /enviar mensagem/i }))

    expect(await screen.findByText('Informe seu nome (mínimo 2 caracteres)')).toBeInTheDocument()
    expect(screen.getByText('E-mail inválido')).toBeInTheDocument()
    expect(screen.getByText('Mensagem com no mínimo 20 caracteres')).toBeInTheDocument()
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('envia dados válidos e mostra feedback de sucesso', async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined)
    const user = userEvent.setup()
    render(<ContactForm onSubmit={onSubmit} />)

    await fill(user, {
      name: 'Ana Souza',
      email: 'ana@exemplo.com',
      message: 'Olá! Gostei muito do seu portfólio.',
    })
    await user.click(screen.getByRole('button', { name: /enviar mensagem/i }))

    expect(await screen.findByText(/mensagem enviada/i)).toBeInTheDocument()
    expect(onSubmit).toHaveBeenCalledTimes(1)
  })

  it('bloqueia o botão durante o envio (evita mensagens duplicadas)', async () => {
    let finish: () => void = () => {}
    const onSubmit = vi.fn(() => new Promise<void>((resolve) => (finish = resolve)))
    const user = userEvent.setup()
    render(<ContactForm onSubmit={onSubmit} />)

    await fill(user, {
      name: 'Ana Souza',
      email: 'ana@exemplo.com',
      message: 'Olá! Gostei muito do seu portfólio.',
    })
    await user.click(screen.getByRole('button', { name: /enviar mensagem/i }))

    const button = await screen.findByRole('button', { name: /enviando/i })
    expect(button).toBeDisabled()
    await user.click(button)
    expect(onSubmit).toHaveBeenCalledTimes(1)

    finish()
    await waitFor(() => expect(screen.getByText(/mensagem enviada/i)).toBeInTheDocument())
  })

  it('mostra erro quando o envio falha', async () => {
    const onSubmit = vi.fn().mockRejectedValue(new Error('falhou'))
    const user = userEvent.setup()
    render(<ContactForm onSubmit={onSubmit} />)

    await fill(user, {
      name: 'Ana Souza',
      email: 'ana@exemplo.com',
      message: 'Olá! Gostei muito do seu portfólio.',
    })
    await user.click(screen.getByRole('button', { name: /enviar mensagem/i }))

    expect(await screen.findByText(/não consegui enviar/i)).toBeInTheDocument()
  })
})
