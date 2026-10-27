---
name: novo-componente
description: Cria um novo componente React seguindo a arquitetura do portfólio (pasta correta, PascalCase, props tipadas, lógica fora do componente, teste ao lado). Use quando pedirem um componente, card, seção ou formulário novo.
---

# Criar componente

1. Decida a pasta: genérico e reutilizável → `src/components/ui/`; de uma funcionalidade → `src/components/<feature>/`.
2. Crie `NomeEmPascalCase.tsx` com `export function Nome(props: NomeProps)` e interface `NomeProps` tipada.
3. O componente só apresenta. Dados e chamadas de API entram por props; a lógica fica em `src/hooks/useXxx.ts` e `src/services/`.
4. Se mostrar dado de API, receba `isLoading`, `error`, `onRetry` e renderize skeleton, `StateMessage` de erro e estado vazio.
5. Reaproveite `Button`, `Skeleton`, `StateMessage`, `OptimizedImage`. Estilos em `src/index.css` com as variáveis de tema.
6. Crie `NomeEmPascalCase.test.tsx` ao lado quando houver validação ou regra de acesso.
7. Rode `npm run lint && npm run test && npm run build`.
