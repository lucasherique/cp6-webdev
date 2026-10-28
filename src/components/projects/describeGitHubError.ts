import { GitHubError } from '../../services/github'

export function describeGitHubError(error: unknown) {
  if (error instanceof GitHubError) {
    if (error.kind === 'rate-limit')
      return 'O GitHub limitou as consultas por um tempo. Tente de novo em alguns minutos.'
    if (error.kind === 'user-not-found')
      return 'Não encontrei esse usuário no GitHub. Confira VITE_GITHUB_USERNAME.'
    if (error.kind === 'not-configured')
      return 'Defina VITE_GITHUB_USERNAME no arquivo .env para carregar os projetos.'
    if (error.kind === 'network') return 'Sem conexão com o GitHub. Verifique sua internet.'
  }
  return 'Não foi possível carregar os projetos agora.'
}
