import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactSchema, type ContactFormValues } from '../../schemas/contact'
import { Button } from '../ui/Button'
import { siteConfig } from '../../config/site'

interface ContactFormProps {
  onSubmit: (values: ContactFormValues) => Promise<void>
}

export function ContactForm({ onSubmit }: ContactFormProps) {
  const [feedback, setFeedback] = useState<'success' | 'error' | null>(null)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({ resolver: zodResolver(contactSchema), mode: 'onBlur' })

  const submit = handleSubmit(async (values) => {
    setFeedback(null)
    try {
      if (!values.website) await onSubmit(values) // honeypot preenchido = robô: finge sucesso
      reset()
      setFeedback('success')
    } catch {
      setFeedback('error')
    }
  })

  return (
    <form onSubmit={submit} noValidate className="form">
      <div className="field">
        <label htmlFor="name">Nome</label>
        <input
          id="name"
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'name-error' : undefined}
          {...register('name')}
        />
        {errors.name && (
          <p id="name-error" className="field-error" role="alert">
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor="email">E-mail</label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'email-error' : undefined}
          {...register('email')}
        />
        {errors.email && (
          <p id="email-error" className="field-error" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor="message">Mensagem</label>
        <textarea
          id="message"
          rows={6}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'message-error' : undefined}
          {...register('message')}
        />
        {errors.message && (
          <p id="message-error" className="field-error" role="alert">
            {errors.message.message}
          </p>
        )}
      </div>

      <div className="hp" aria-hidden="true">
        <label htmlFor="website">Não preencha</label>
        <input id="website" tabIndex={-1} autoComplete="off" {...register('website')} />
      </div>

      <Button type="submit" loading={isSubmitting}>
        {isSubmitting ? 'Enviando…' : 'Enviar mensagem'}
      </Button>

      {feedback === 'success' && (
        <p className="feedback feedback-ok" role="status">
          Mensagem enviada. Respondo em breve.
        </p>
      )}
      {feedback === 'error' && (
        <p className="feedback feedback-error" role="alert">
          Não consegui enviar a mensagem. Tente de novo ou escreva para {siteConfig.email}.
        </p>
      )}
    </form>
  )
}
