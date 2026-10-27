---
name: revisar-pr
description: Roda a checagem completa (lint, formatação, testes, build) e aciona o agente code-reviewer antes de abrir um Pull Request.
---

# Revisar antes do PR

1. `npm run lint`, `npm run format:check`, `npm run test`, `npm run build`. Corrija o que falhar.
2. Chame o agente `code-reviewer` para revisar o diff contra a `main`.
3. Resuma ao usuário: o que mudou, como testar e o resultado das checagens.
