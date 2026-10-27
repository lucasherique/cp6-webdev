# Portfólio front-end

Site de portfólio em React que carrega os projetos direto do GitHub, recebe mensagens por um formulário de contato e tem um dashboard protegido para o dono.

- **Site publicado:** _cole aqui o link da Vercel_
- **Vídeo de apresentação:** _cole aqui o link do YouTube (não listado)_

## Funcionalidades

- Rotas com link individual por projeto (`/projetos/nome-do-repo`), páginas 404 e de erro de API; links diretos funcionam ao atualizar a página.
- Projetos carregados da API do GitHub (descrição, linguagem, última atualização), com cache para não repetir chamadas.
- Estados de carregamento, erro e lista vazia em tudo que vem de API (skeleton nos cards, spinner nos botões).
- Formulário de contato com validação por campo; a mensagem vai por e-mail (Formspree) e é salva no Supabase.
- Dashboard (`/admin`) com login: lista de mensagens com "marcar como respondida" e escolha dos projetos em destaque na home.
- Tema claro/escuro que persiste entre visitas, sem "piscar" ao abrir.
- Cena 3D interativa na home (reage ao mouse e à rolagem), carregada sob demanda.

## Tecnologias

Vite · React 19 · TypeScript · React Router · TanStack Query · React Hook Form + Zod · Supabase · Formspree · React Three Fiber · Vitest + Testing Library · ESLint + Prettier · Husky + lint-staged + commitlint · GitHub Actions · Vercel.
A justificativa de cada escolha está em [`docs/DECISOES.md`](docs/DECISOES.md).

## Como rodar

```bash
git clone <url-do-repositorio>
cd portfolio
npm install
cp .env.example .env     # preencha as variáveis (veja abaixo)
npm run dev              # http://localhost:5173
```

| Variável                  | Para quê                                          |
| ------------------------- | ------------------------------------------------- |
| `VITE_GITHUB_USERNAME`    | Usuário do GitHub dono dos projetos               |
| `VITE_SUPABASE_URL`       | URL do projeto Supabase                           |
| `VITE_SUPABASE_ANON_KEY`  | Chave pública (anon) do Supabase                  |
| `VITE_FORMSPREE_ENDPOINT` | URL do formulário no Formspree (envio por e-mail) |

Configure o banco rodando [`supabase/schema.sql`](supabase/schema.sql) no SQL Editor do Supabase e crie o usuário do dono em Authentication > Users. Passo a passo completo em [`docs/PASSO-A-PASSO.md`](docs/PASSO-A-PASSO.md).
Seus dados pessoais (nome, bio, e-mail, LinkedIn) ficam em `src/config/site.ts`.

## Como entrar na Área do dono

O login não tem e-mail nem senha fixos no código. Você cria o seu acesso no Supabase (Authentication > Users > Add user), escolhendo o e-mail e uma senha forte, e desativa o cadastro público. Depois entre em `/admin` com essas credenciais. Nunca coloque a senha no repositório.

## Scripts

`npm run dev` · `npm run build` · `npm run test` · `npm run lint` · `npm run format` · `npm run analyze` (visualizador de pacotes)

## Estrutura de pastas

```
src/
  pages/        uma página por rota (monta componentes e chama hooks)
  components/   ui/ (genéricos) · layout/ · projects/ · contact/ · admin/ · auth/ · three/
  hooks/        useRepos, useFeatured, useMessages... (ligam UI e serviços)
  services/     único lugar com fetch / Supabase
  schemas/      validação Zod
  context/      tema e autenticação
  lib/ types/ config/
```

Fluxo de dados: `página → hook (TanStack Query) → service → API (GitHub / Supabase / Formspree)`.

## Padrões do projeto

Estes mesmos padrões estão em [`CLAUDE.md`](CLAUDE.md), que a IA lê antes de cada tarefa.

**Nomenclatura:** componentes em `PascalCase.tsx`; hooks `useCamelCase.ts`; serviços e utilitários em `camelCase.ts`; constantes `UPPER_SNAKE_CASE`; testes ao lado do arquivo (`Nome.test.tsx`).

**Commits (Conventional Commits):** `tipo: descrição no imperativo`. Tipos: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `ci`, `perf`. Exemplo: `feat: adiciona validação do formulário de contato`. Validado por commitlint (Husky).

**Branches (GitHub Flow):** `main` protegida e sempre publicada; uma branch por funcionalidade (`feature/dashboard`, `fix/...`, `docs/...`, `chore/...`) integrada via Pull Request.

**Qualidade automática:** antes de cada commit o Husky roda lint-staged (ESLint + Prettier); a CI no GitHub Actions roda lint, formatação, testes e build em cada push/PR.

## Harness de IA

`CLAUDE.md` (instruções) · `.claude/settings.json` (permissões e hook de formatação) · `.claude/skills/` (novo-componente, commit-e-branch, revisar-pr) · `.claude/agents/code-reviewer.md` · `.mcp.json` (context7, playwright, github).

## Deploy

Cada push na `main` publica automaticamente na Vercel. `vercel.json` redireciona todas as rotas para o `index.html`, então links diretos e F5 funcionam.
