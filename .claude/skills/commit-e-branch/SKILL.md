---
name: commit-e-branch
description: Cria a branch certa e faz commits no padrão Conventional Commits. Use sempre que for começar uma funcionalidade, commitar ou preparar um Pull Request.
---

# Branch e commit

1. Rode `git status` e `git branch --show-current`. Se estiver na `main`, crie a branch: `git switch -c feature/nome-curto` (ou `fix/`, `docs/`, `chore/`).
2. Faça `git add` só dos arquivos da mudança lógica atual (nunca `git add .` sem olhar o `git status`).
3. Mensagem: `tipo: descrição no imperativo em português`, tipos: feat, fix, docs, style, refactor, test, chore, ci, perf.
4. Os hooks do Husky rodam lint-staged e commitlint. Se falharem, corrija; nunca use `--no-verify`.
5. Ao finalizar a funcionalidade, `git push -u origin <branch>` e abra um Pull Request preenchendo o template.
