# Instruções do projeto para a IA

Portfólio front-end em React + TypeScript. Leia este arquivo antes de qualquer alteração e siga-o sem que eu precise repetir.

## Comandos

- `npm run dev` servidor local · `npm run build` build de produção
- `npm run lint` ESLint · `npm run format` Prettier · `npm run test` Vitest
- Antes de dizer que terminou: `npm run lint && npm run test && npm run build` devem passar.

## Stack (não troque sem pedir)

Vite, React 19, TypeScript estrito, React Router (`createBrowserRouter`), TanStack Query,
React Hook Form + Zod, Supabase (auth + banco), Formspree (e-mail), React Three Fiber (3D),
CSS puro com variáveis em `src/index.css`, Vitest + Testing Library.

## Arquitetura (responsabilidade de cada pasta)

- `src/pages/` uma página por rota; só monta componentes e chama hooks. Export `default`.
- `src/components/ui/` peças genéricas reutilizáveis (Button, Skeleton, StateMessage...).
- `src/components/<feature>/` componentes de uma funcionalidade (projects, contact, admin...).
- `src/hooks/` hooks `useXxx` que ligam componentes aos serviços (TanStack Query).
- `src/services/` ÚNICO lugar com `fetch`/Supabase. Componentes NUNCA chamam API direto.
- `src/schemas/` esquemas Zod. `src/context/` Theme e Auth. `src/lib/` utilitários. `src/types/` tipos.
- Componentes visuais são apresentacionais: recebem dados por props (`isLoading`, `error`, `onRetry`).
- Todo dado de API precisa de 3 estados na UI: carregando (skeleton/spinner), erro (com "Tentar de novo") e vazio.

## Regras de performance

- Páginas (exceto Home) usam lazy por rota em `src/router.tsx`.
- `three` e `@supabase/supabase-js` ficam fora do pacote inicial (import dinâmico). Não importe no topo de arquivos da Home/Layout.
- Imagens: sempre `OptimizedImage` (width/height + lazy). Nada de layout que "pula" ao carregar.
- Repositórios do GitHub vêm de UMA query (`useRepos`, chave `['github-repos']`). Não crie outra chamada ao GitHub.

## Nomenclatura

- Componentes e arquivos de componente: `PascalCase.tsx`. Hooks: `useCamelCase.ts`.
- Serviços/utilitários: `camelCase.ts`. Constantes globais: `UPPER_SNAKE_CASE`. Tipos/interfaces: `PascalCase`.
- Testes ao lado do arquivo: `Nome.test.tsx`. Classes CSS: `kebab-case`.
- Código em inglês; textos exibidos ao usuário em português do Brasil, em voz ativa e sem pedir desculpas em erros.

## Commits (Conventional Commits, validado por commitlint)

Formato: `tipo: descrição curta no imperativo, em português`. Tipos: feat, fix, docs, style, refactor, test, chore, ci, perf.
Exemplos: `feat: adiciona validação do formulário de contato`, `fix: corrige redirecionamento do login`.
Um commit = uma mudança lógica. Nunca use `--no-verify`.

## Branches (GitHub Flow)

- `main` é protegida e sempre faz deploy. Nunca commite direto nela.
- Uma branch por funcionalidade: `feature/nome`, `fix/nome`, `docs/nome`, `chore/nome`.
- Integre via Pull Request (template em `.github/pull_request_template.md`).

## Testes

Toda regra nova de validação ou proteção de rota ganha teste. Cobertura mínima obrigatória do trabalho:
validação do formulário (`ContactForm.test.tsx`, `contact.test.ts`) e bloqueio do dashboard sem login (`ProtectedRoute.test.tsx`).

## Proibido

- Ler ou exibir `.env`; commitar segredos. Use `.env.example` para documentar variáveis `VITE_*`.
- Usar `localStorage` direto em componentes (tema fica em `ThemeProvider`).
- Instalar dependência nova sem justificar no PR.
