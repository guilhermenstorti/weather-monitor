# 🌦️ Weather Monitor - Dashboard

Personal study project on practical software development with the aid of LLMs in a disciplined manner, using a custom harness layer (general rules + specific skills + agnostic approach to LLM communication) to guide the AI before any line of code is written. The goal was not just to build a functional "weather dashboard" (frontend + backend consuming the Open-Meteo API), but mainly to test how far it is possible to guide a code assistant (in this case, Claude Code) with an explicit and reusable set of engineering rules, instead of relying solely on the model's implicit common sense.

**Live Demo:** [guilhermenstorti.github.io/weather-monitor](https://guilhermenstorti.github.io/weather-monitor/)

---

## Index

- [Index](#index)
- [About the project](#about-the-project)
- [AI Harness: rules and skills](#ai-harness-rules-and-skills)
- [Agnostic LLM architecture](#agnostic-llm-architecture)
- [Project log](#project-log)
- [How to run locally](#how-to-run-locally)
- [Tests](#tests)
- [Production build](#production-build)
- [Deploy](#deploy)
- [Technical stack](#technical-stack)

---

## About the project

This repository was born as an exercise about **AI-assisted development process**. The goal was not just to build a functional "weather dashboard" (frontend + backend consuming the Open-Meteo API), but mainly to test how far it is possible to guide a code assistant (in this case, Claude Code) with an explicit and reusable set of engineering rules, instead of relying solely on the model's implicit common sense.

For this, the repository loads a custom configuration layer (called here as *harness*) divided into two complementary concepts:

- **Rules** (`.claude/rules/`): the engineering rules themselves, with examples of "good vs. bad" code. They are the human-readable reference material for the project.
- **Skills** (`.claude/skills/`): the same governance, in a more instructional/terse format (with frontmatter `name`/`description`), in the format of *Agent Skills* that the Claude Code loads on demand according to the task in progress.

A file [`CLAUDE.md`](CLAUDE.md) at the root works as an index: for each skill, it says **when to activate it** and **when not to use it**, as well as suggesting a reading order by task type (backend, frontend, tests).

## AI Harness: rules and skills

Each rule exists in two formats (equivalent content, different purposes). The table below summarizes what each one covers:

| Topic | Rule | Skill | What defines it |
|---|---|---|---|
| Code standards | [`code-standards.md`](.claude/rules/code-standards.md) | [`code-standards-en`](.claude/skills/code-standards-en/SKILL.md) | English naming (camelCase/PascalCase/kebab-case), named functions with verbs, CQS (query never mutates), early return instead of nested `if/else`, no boolean flags for behavior, limit size for methods (50 lines) and classes (300 lines), comments only when the "why" is not obvious. |
| REST / HTTP | [`api-rest-http.md`](.claude/rules/api-rest-http.md) | [`express-rest-http`](.claude/skills/express-rest-http/SKILL.md) | Express as the only HTTP framework, resources in English/plural, mutations via `POST` + verb (never `PUT` cru), standardized status codes (200/400/401/403/404/422/500/502), OpenAPI documentation, pagination `limit/offset`, use of the native `fetch` for external calls. |
| Node.js / TypeScript | [`node-js-ts.md`](.claude/rules/node-js-ts.md) | [`nodejs-typescript-conventions`](.claude/skills/nodejs-typescript-conventions/SKILL.md) | Strict TypeScript in all source code, npm as the only package manager, `const` by default, prohibition of `any` and `var`, pure ESM (`import`/`export`, never `require`), `async`/`await` instead of `.then`. |
| React / Frontend | [`react.md`](.claude/rules/react.md) | [`react-frontend-conventions`](.claude/skills/react-frontend-conventions/SKILL.md) | Functional components `.tsx`, state as close as possible to use, prohibition of spread props, Tailwind as the only way to style, Context API for state between components, mandatory automated tests by component. |
| Folder structure | [`folder-structure.md`](.claude/rules/folder-structure.md) | [`repo-folder-structure`](.claude/skills/repo-folder-structure/SKILL.md) | Hybrid layout in the frontend (`features/<name>/{components,hooks,lib,api,types}` + `components/ui` + `pages` + `routes`) and mandatory layers in the backend (`controllers/ → services/ → data/`), with dependency flow in a single direction. |
| Automated tests | [`tests.md`](.claude/rules/tests.md) | [`vitest-testing`](.claude/skills/vitest-testing/SKILL.md) | Vitest + `vi` as the only mock stack (never Jest/Sinon), Arrange-Act-Assert pattern, fake timers for code dependent on `Date`, HTTP endpoint tests as integration **without** supertest, use case tests with mock external dependencies, complete unit coverage of the domain logic. |

## Agnostic LLM architecture

A deliberate point of design of this harness: it **does not depend on being tied to Claude Code**. The `.claude/rules` + `.claude/skills` structure is the native format that Claude Code recognizes automatically, but the `.agents/skills` file exists as a **pointer** to `.claude/skills`:

```
.agents/skills → .claude/skills
```

Therefore, any other AI tool or agent that adopts the convention `.agents/skills/<name>/SKILL.md` (a format that is gaining more adoption among different AI-assisted coding tools) sees exactly the same skills, without duplication of content and without coupling to a specific LLM provider. Changing the AI assistant in the future does not require rewriting the project's governance — only reconnect the same set of rules to another tool.

## Project log

Unlike a traditional "code first" development, this project was deliberately built **from outside to inside**: first the intention, then the governance, only then the implementation.

**1. Complete story specification** ([`prompt.md`](prompt.md))
Before any rule or code, a structured prompt was written describing the task in its entirety: objective and value proposition, business requirements, architectural decisions (frontend/backend/external integration), UI/UX requirements, contracts of external APIs (Open-Meteo) and the own backend, acceptance criteria in the Given-When-Then format, and explicit restrictions (what to do and what not to do). This document was refined throughout the project as the understanding matured.

**2. Definition of rules** ([`.claude/rules/`](.claude/rules))
With the story mature, the engineering rules came: code standards, REST/HTTP conventions, Node/TypeScript conventions, React conventions, folder structure.

**3. Definition of skills** ([`.claude/skills/`](.claude/skills), with the pointer `.agents/skills`)
Written as *Agent Skills*, the format that the Claude Code loads on demand, plus an index in [`CLAUDE.md`](CLAUDE.md) saying when each one applies.

**4. Definition of the test layer**
Before any implementation, the rule of quality for automated tests (Vitest, AAA, mocks, HTTP integration without supertest) was already fixed as a rule, not as something added later, "if there's time".

**5. Implementation**
Only then the code was written: backend Express/TypeScript in layers (`controllers → services → data`) integrating with Open-Meteo, followed by frontend React/Tailwind consuming exclusively the own backend, each layer accompanied by automated tests from the first commit.

**6. Deploy**
Backend published on Render (Node/Express) and frontend published on GitHub Pages via GitHub Actions, with the frontend configured to never call Open-Meteo directly, always through the backend.

## How to run locally
### Prerequisites

- [Node.js](https://nodejs.org/) 18 or higher
- npm (installed together with Node.js)

### 1. Clone the repository

```bash
git clone https://github.com/guilhermenstorti/weather-monitor.git
cd weather-monitor
```

### 2. Run the backend

```bash
cd backend
npm install
npm run dev
```

The backend starts on `http://localhost:3333` (port configurable via environment variable `PORT`).

### 3. Run the frontend

In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend starts on `http://localhost:5173` and defaults to `http://localhost:3333`. If the backend is running on another URL, copy `.env.example` to `.env.local` and adjust:

```bash
cp .env.example .env.local
# adjust VITE_API_BASE_URL as needed
```

With the two services running, access `http://localhost:5173` in the browser and search for a city.

## Tests

Each project (`backend/` and `frontend/`) has its own Vitest suite, independent:

```bash
# in backend/ or frontend/
npm run test        # run the suite once
npm run test:watch  # watch mode
```

## Production build

```bash
# backend
cd backend && npm run build && npm start

# frontend
cd frontend && npm run build && npm run preview
```

## Deploy

- **Frontend**: published on GitHub Pages via [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml), triggered by each push to `main` that changes `frontend/**`. The backend URL is injected at build time through the repository variable `VITE_API_BASE_URL` (Settings → Secrets and variables → Actions → Variables).
- **Backend**: published on [Render](https://render.com) (free plan) as Node Web Service, with `backend` as Root Directory, `npm ci && npm run build` as build command and `npm start` as start command.

## Technical stack

| Layer | Technologies |
|---|---|
| Backend | Node.js, TypeScript, Express, Vitest |
| Frontend | React, TypeScript, Vite, Tailwind CSS, Vitest, Testing Library |
| External API | [Open-Meteo](https://open-meteo.com/) (geocoding + weather forecast, without the need for an API key) |
| CI/CD | GitHub Actions (frontend → GitHub Pages), Render (backend) |
