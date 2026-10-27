# Passo a passo: do zero ao deploy

## 1. Rodar localmente

```bash
cd portfolio
npm install
cp .env.example .env
npm run dev
```

Edite `src/config/site.ts` (nome, bio, e-mail, LinkedIn) e `index.html` (título).

## 2. Supabase (banco + login)

1. Crie conta em supabase.com > **New project** (guarde a senha do banco).
2. **SQL Editor > New query**: cole o conteúdo de `supabase/schema.sql` > **Run**.
3. **Authentication > Users > Add user**: crie o seu e-mail e senha (marque "Auto confirm").
4. **Authentication > Sign In / Providers**: desative **Allow new users to sign up**, para só você ter acesso.
5. **Project Settings > API**: copie **Project URL** e a chave **anon public** para `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`. Nunca use a chave `service_role`.

## 3. Formspree (e-mail)

formspree.io > **New form** com o seu e-mail > copie a URL (`https://formspree.io/f/xxxx`) para `VITE_FORMSPREE_ENDPOINT`. Confirme o e-mail que o Formspree pedir.

## 4. GitHub

1. Crie um repositório **público** vazio (sem README) chamado `portfolio`.
2. No terminal da pasta do projeto:

```bash
git init
git branch -M main
git add .gitignore README.md
git commit -m "chore: inicia repositório com README"
git remote add origin https://github.com/SEU-USUARIO/portfolio.git
git push -u origin main
```

3. **Settings > Branches > Add rule** em `main`: marque "Require a pull request before merging".
4. Para o Husky funcionar após clonar: `npm install` (o script `prepare` ativa os hooks).

## 5. Histórico de commits e branches (faça ao longo dos dias, uma por dia)

Faça cada bloco em uma branch, abra o Pull Request, faça o merge, e `git switch main && git pull` antes da próxima. Escreva commits do seu jeito, no padrão `tipo: descrição`.

| Branch                    | Arquivos (`git add ...`)                                                                                                                                                                                            | Commit sugerido                                              |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| `chore/setup-projeto`     | `package.json package-lock.json .npmrc tsconfig.json vite.config.ts eslint.config.js .prettierrc .prettierignore .lintstagedrc.json commitlint.config.cjs .husky index.html public .env.example .github`            | `chore: configura vite, lint, husky e CI`                    |
| `docs/harness-ia`         | `CLAUDE.md .claude .mcp.json docs`                                                                                                                                                                                  | `docs: adiciona instruções e skills da IA`                   |
| `feature/base-e-tema`     | `src/lib src/types src/config src/context/theme-context.ts src/context/ThemeProvider.tsx src/components/ui src/components/layout src/index.css`                                                                     | `feat: adiciona componentes base, layout e tema`             |
| `feature/projetos-github` | `src/services/github.ts src/hooks/useRepos.ts src/hooks/useDocumentTitle.ts src/components/projects src/pages/ProjectsPage.tsx src/pages/ProjectDetailPage.tsx src/pages/NotFoundPage.tsx src/pages/RouteError.tsx` | `feat: lista projetos do github com estados de carregamento` |
| `feature/contato`         | `src/schemas src/services/messages.ts src/hooks/useMessages.ts src/components/contact src/pages/ContactPage.tsx`                                                                                                    | `feat: adiciona formulário de contato com validação`         |
| `feature/dashboard`       | `src/services/auth.ts src/services/featured.ts src/hooks/useFeatured.ts src/context/auth-context.ts src/context/AuthProvider.tsx src/components/auth src/components/admin src/pages/admin supabase`                 | `feat: adiciona dashboard com login e mensagens`             |
| `feature/home-3d`         | `src/components/three src/pages/HomePage.tsx src/router.tsx src/main.tsx src/test vercel.json`                                                                                                                      | `feat: adiciona home com cena 3d e rotas`                    |

Observação: o `build` da CI só fica verde quando `router.tsx`/`main.tsx` entram (última branch); não exija checagens obrigatórias na proteção da `main` até lá. Ajuste a divisão se preferir.

## 6. Vercel (deploy automático)

1. vercel.com > entre com o GitHub > **Add New > Project** > importe `portfolio`.
2. Framework: **Vite** (detecta sozinho). Build `npm run build`, saída `dist`.
3. **Environment Variables**: cadastre as 4 variáveis `VITE_*` (mesmos valores do `.env`).
4. **Deploy**. A partir daí, cada push na `main` publica sozinho.
5. Teste: abra `https://seu-site.vercel.app/projetos/algum-repo` e aperte F5: deve continuar na página (o `vercel.json` cuida disso).

## 7. Lighthouse (nota mínima 80 no mobile)

1. Abra o site publicado no Chrome em **janela anônima** > F12 > aba **Lighthouse** > modo **Mobile** > só "Performance" > Analyze. Ou use pagespeed.web.dev.
2. Se ficar abaixo de 80, rode `npm run analyze` e veja o que pesa no pacote inicial.
3. Tire um print do resultado para mostrar no vídeo.

## 8. Usar a IA com o harness (para mostrar no vídeo)

Instale o Claude Code e abra o repositório (`claude` na pasta). Ele lê `CLAUDE.md`, as skills e o `.mcp.json` sozinho. Para as próximas mudanças, peça coisas como "use a skill novo-componente para criar um componente de skills" e "use a skill commit-e-branch". O vídeo deve mostrar **o que você realmente fez** com a IA.
