import { ContactForm } from '../components/contact/ContactForm'
import { useSendMessage } from '../hooks/useMessages'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import type { ContactFormValues } from '../schemas/contact'

export default function ContactPage() {
  useDocumentTitle('Contato')
  const send = useSendMessage()

  return (
    <section className="section narrow">
      <h1>Contato</h1>
      <p className="lead muted">Conte sobre a vaga, o projeto ou a dúvida.</p>
      <ContactForm onSubmit={(values: ContactFormValues) => send.mutateAsync(values)} />
    </section>
  )
}
