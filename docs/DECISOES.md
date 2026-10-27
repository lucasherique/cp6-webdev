# Decisões técnicas

Formato: o que comparei, critério, o que aceitei perder. Use este arquivo como base do vídeo (partes 2 e 3) e **confirme cada decisão com as suas palavras**.

## Stack

| Decisão         | Comparei                                            | Critério                                                                        | O que aceitei perder                                      |
| --------------- | --------------------------------------------------- | ------------------------------------------------------------------------------- | --------------------------------------------------------- |
| Build/framework | Vite (SPA), Next.js                                 | Simplicidade e deploy estático; o site não precisa de SSR                       | SEO por renderização no servidor e rotas de API embutidas |
| Rotas           | React Router, TanStack Router, wouter               | Maturidade, documentação, `lazy` por rota e `errorElement`                      | Tipagem de rotas mais forte do TanStack Router            |
| Dados de API    | `useEffect`+`useState`, SWR, TanStack Query         | Cache compartilhado, estados `isLoading/error`, retry, invalidação após mutação | +13 kB gzip e uma API para aprender                       |
| Backend         | Supabase, Firebase, PocketBase, Node próprio        | Auth + Postgres + RLS prontos, plano gratuito, SQL                              | Dependência de um serviço de terceiros                    |
| E-mail          | Formspree, EmailJS, backend próprio                 | Zero servidor, chave não fica no front                                          | Limite do plano gratuito                                  |
| Formulário      | Validação manual, Formik, React Hook Form + Zod     | Poucos re-renders; mensagens por campo; esquema Zod testável sem UI             | Duas bibliotecas a mais                                   |
| Estilo          | CSS puro, Tailwind, MUI, shadcn/ui                  | Identidade visual própria, bundle mínimo, sem compilador extra                  | Mais CSS escrito à mão                                    |
| 3D              | React Three Fiber, Three puro, Spline               | Integra com React; carregado sob demanda                                        | Pacote pesado (isolado e preguiçoso)                      |
| Tema            | Context + localStorage, Zustand, biblioteca de tema | Estado minúsculo; script no `index.html` evita flash                            | Nada relevante                                            |
| Testes          | Vitest + Testing Library, Playwright                | Rápido, mesmo config do Vite, cobre regras críticas                             | Sem teste de ponta a ponta no navegador real              |
| Deploy          | Vercel, Netlify, hospedagem tradicional             | Deploy automático por push, preview por PR, grátis                              | Vendor lock-in leve                                       |
| Lint/format     | ESLint + Prettier, Biome                            | Ecossistema de regras (hooks do React)                                          | Mais lento e mais configuração que o Biome                |
| Linguagem       | JavaScript, TypeScript                              | Erros pegos antes de rodar, melhor apoio para a IA                              | Curva de aprendizado                                      |
| Fluxo Git       | GitHub Flow, Git Flow, trunk-based                  | Projeto individual, deploy contínuo, uma branch por feature                     | Sem branch de release                                     |

## Performance (como cada requisito é atendido)

- Dashboard, Supabase e cena 3D em chunks separados (`React.lazy`, `import()`); veja `npm run analyze`.
- Cache de 30 min da lista do GitHub numa só query: navegar não repete a chamada.
- `OptimizedImage` com `width/height` + `loading="lazy"`; skeletons com a mesma altura dos cards; fonte local (`@fontsource`) sem requisição a terceiros.
- Tema aplicado por script inline antes da pintura (sem flash nem salto).

## Harness de IA

| Peça                                                              | Por quê                                                                                                 |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Claude Code + modelo Claude (escreva aqui o modelo que você usou) | Trabalha no repositório, roda comandos e lê o `CLAUDE.md` automaticamente                               |
| `CLAUDE.md`                                                       | Fonte única das regras de arquitetura, nomenclatura, commits e branches; a IA não precisa que eu repita |
| `.claude/settings.json`                                           | Permissões mínimas (nega ler `.env` e `push --force`) e hook que formata cada arquivo editado           |
| Skill `novo-componente`                                           | Todo componente nasce na pasta certa, com props tipadas, estados de API e teste                         |
| Skill `commit-e-branch`                                           | Cria branch `feature/*` e commits Conventional Commits                                                  |
| Skill `revisar-pr` + agente `code-reviewer`                       | Revisão com contexto limpo contra as regras antes do PR                                                 |
| MCP context7                                                      | Documentação atual das bibliotecas (evita API desatualizada)                                            |
| MCP playwright                                                    | A IA abre o site e confere o resultado visual                                                           |
| MCP github                                                        | Abrir PR e consultar issues sem sair da conversa                                                        |
| Husky + commitlint + lint-staged                                  | Rede de segurança: mesmo que a IA erre, o commit é barrado                                              |

**Como o conjunto faz a IA seguir os padrões:** `CLAUDE.md` diz a regra; as skills transformam a regra em passos; o agente confere o resultado; os hooks (Husky/CI) bloqueiam o que escapar.
