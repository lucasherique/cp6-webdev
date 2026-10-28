import { isRouteErrorResponse, useRouteError } from 'react-router-dom'
import { ButtonLink } from '../components/ui/Button'
import { StateMessage } from '../components/ui/StateMessage'

export default function RouteError() {
  const error = useRouteError()
  const is404 = isRouteErrorResponse(error) && error.status === 404
  return (
    <main className="container main">
      <StateMessage
        tone={is404 ? 'neutral' : 'error'}
        title={is404 ? 'Página não encontrada' : 'Algo deu errado'}
        description={
          is404
            ? 'O endereço que você abriu não existe.'
            : 'Ocorreu um erro inesperado ao abrir esta página. Tente voltar ao início.'
        }
        action={<ButtonLink to="/">Voltar para o início</ButtonLink>}
      />
    </main>
  )
}
