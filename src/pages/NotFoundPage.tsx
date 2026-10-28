import { ButtonLink } from '../components/ui/Button'
import { StateMessage } from '../components/ui/StateMessage'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function NotFoundPage() {
  useDocumentTitle('Página não encontrada')
  return (
    <StateMessage
      title="Página não encontrada"
      description="O endereço que você abriu não existe ou foi movido."
      action={<ButtonLink to="/">Voltar para o início</ButtonLink>}
    />
  )
}
