# CLAUDE.md

Guidance for Claude Code sessions working in this repository.

## Project

Encryption App: a React + TypeScript SPA with a random password generator and
a Caesar cipher encrypt/decrypt tool.

Routes (`react-router-dom`, `BrowserRouter`):

| Path         | Description                   |
| ------------ | ----------------------------- |
| `/`          | Landing page                  |
| `/generator` | Random password generator     |
| `/cipher`    | Caesar cipher encrypt/decrypt |

## Commands

| Command                | Description                                |
| ---------------------- | ------------------------------------------ |
| `npm start`            | Dev server (Vite)                          |
| `npm run build`        | Type-check + production build into `dist/` |
| `npm run preview`      | Serve the production build locally         |
| `npm run lint`         | ESLint                                     |
| `npm run lint:fix`     | ESLint with `--fix`                        |
| `npm run format`       | Prettier, writes changes                   |
| `npm run format:check` | Prettier, check only                       |
| `npm run typecheck`    | `tsc --noEmit`                             |
| `npm test`             | Vitest, run once                           |
| `npm run test:watch`   | Vitest, watch mode                         |

## Architecture

- `src/features/*` — one directory per feature (`password-generator`,
  `caesar-cipher`), plus `Landing.tsx`.
- `src/components` — shared, feature-agnostic components.
- `src/layout` — layout/chrome components (e.g. `Navbar`).
- `src/style` — SCSS, loosely 7-1 pattern: `abstracts/` (variables),
  `base/` (reset), `layout/`, `components/`, plus `main.scss` as the entry
  point that `@use`s the partials.
- `src/assets` — static assets used from code (e.g. icon components).

### Path aliases

`components`, `features`, `layout`, `assets`, `style` are defined as aliases in
**both** `vite.config.ts` (`resolve.alias`) and `tsconfig.json`
(`compilerOptions.paths`). Always import through these aliases
(`import Navbar from 'layout/Navbar'`) — never use deep relative paths like
`../../layout/Navbar`.

### Conventions

- TypeScript `strict` mode. Type-only imports are enforced via
  `@typescript-eslint/consistent-type-imports` — use `import type { X }`.
- Import order is enforced by `eslint-plugin-simple-import-sort`: type
  imports, then external packages (react first), then alias imports, then
  relative imports.
- Formatting is tabs, single quotes, per `.prettierrc` — run `npm run format`
  rather than hand-formatting.
- SCSS variables live in `src/style/abstracts/_variables.scss` — no hardcoded
  colors in component styles.

## Git workflow (mandatory)

1. At the start of any task, verify the working tree is clean
   (`git status`) and check the current branch (`git branch --show-current`).
2. New work always starts from up-to-date `main`:
   `git checkout main && git pull`.
3. Create a fresh branch named `<type>/<short-description>`, where `<type>` is
   one of `feat|fix|chore|refactor|test|perf|docs`.
4. Never commit or push without explicit user approval.
5. Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/).

## Quality gates

Before declaring any task done, all of the following must pass:

```
npm run format:check && npm run lint && npm run typecheck && npm test && npm run build
```

## Rules

- No new dependency without stating why it's needed.
- All interactive elements need accessible names.
- Behavior changes require tests.
- No analytics/tracking additions without explicit approval.

## Deferred upgrades

- `react-router-dom` (`^7.5.0`) has multiple known advisories fixable via
  `npm audit fix` (a version bump within the `7.x` range). Not addressed here
  per instruction not to upgrade existing dependencies in this phase.
