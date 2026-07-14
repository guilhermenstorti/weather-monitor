# Skills → ações

Consulte o `SKILL.md` em `.agents/skills/<nome>/` antes de implementar ou revisar.

| Skill | Acionar para… | Não usar se… |
|--------|----------------|---------------|
| `code-standards-en` | Nomes em inglês, PR, CQS, early return, tamanho de métodos/classes | Política exige identificadores localizados |
| `express-rest-http` | Rotas Express, HTTP, status, OpenAPI, `fetch` externo | Framework servidor não for Express |
| `nodejs-typescript-conventions` | TS/Node, ESM, npm, async/await, sem `any` | Projeto JS puro ou gestor ≠ npm |
| `react-frontend-conventions` | React FC, TSX, Tailwind, hooks, testes de UI | Class components, styled-components, sem Tailwind (neste repo) |
| `repo-folder-structure` | Onde criar `features`, pages, controllers/services/data | Layout do monorepo ou framework diferente do template |
| `vitest-testing` | Vitest, `vi`, AAA, timers, integração HTTP sem supertest | Jest/Sinon como stack principal de mock |

**Ordem sugerida por tarefa:** backend HTTP → `express-rest-http`, depois `repo-folder-structure`, `nodejs-typescript-conventions`, `code-standards-en`. Frontend → `react-frontend-conventions`, `repo-folder-structure`, `nodejs-typescript-conventions`, `code-standards-en`. Testes → `vitest-testing` + skill da camada testada.