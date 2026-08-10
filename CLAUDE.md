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

| Command                | Description                                                                          |
| ---------------------- | ------------------------------------------------------------------------------------ |
| `npm start`            | Dev server (Vite)                                                                    |
| `npm run build`        | Type-check + production build into `dist/`                                           |
| `npm run preview`      | Serve the production build locally                                                   |
| `npm run analyze`      | Build with a bundle-size report at `dist/stats.html` (not part of the default build) |
| `npm run lint`         | ESLint                                                                               |
| `npm run lint:fix`     | ESLint with `--fix`                                                                  |
| `npm run format`       | Prettier, writes changes                                                             |
| `npm run format:check` | Prettier, check only                                                                 |
| `npm run typecheck`    | `tsc -b` (covers `src` + the config files)                                           |
| `npm test`             | Vitest, run once                                                                     |
| `npm run test:watch`   | Vitest, watch mode                                                                   |

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

`components`, `features`, `layout`, `assets`, `style` are declared **once**, in
`tsconfig.json` (`compilerOptions.paths`). Vite picks them up from there via
`resolve.tsconfigPaths: true` in `vite.config.ts`, so add or rename an alias in
`tsconfig.json` only. Always import through these aliases
(`import Navbar from 'layout/Navbar'`) — never use deep relative paths like
`../../layout/Navbar`.

### TypeScript projects

`tsconfig.json` covers `src` and references `tsconfig.node.json`, which covers
the toolchain configs (`vite.config.ts`, `eslint.config.ts`) under Node types.
`npm run typecheck` and `npm run build` both run `tsc -b`, so the config files
are type-checked too — do not downgrade either back to a bare `tsc`.

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

- **ESLint 10** — `eslint-plugin-react@7.37.5` (latest stable) declares
  `peerDependencies.eslint: "^3 || ^4 || ^5 || ^6 || ^7 || ^8 || ^9.7"`, so it
  has no ESLint 10 support; npm resolves `eslint@10` only by overriding that
  peer. Every other plugin in the stack is ready (`typescript-eslint` accepts
  `^10.0.0`, `eslint-plugin-react-hooks` accepts `^10.0.0`,
  `simple-import-sort` and `eslint-config-prettier` are unbounded). The whole
  group is therefore held at the latest 9.x — never mix ESLint majors across
  plugins. Revisit when `eslint-plugin-react` ships a stable release with an
  `^10` peer (only a `7.8.0-rc.0` pre-release exists on the `next` tag).

- **TypeScript 7** — held at the latest `5.9.x` patch. TS 7 is the native
  (Go) port of the compiler and `typescript-eslint@8.67.0` declares
  `peerDependencies.typescript: ">=4.8.4 <6.1.0"`, so it cannot type-check
  this project's lint setup. Revisit once typescript-eslint publishes a
  release with a TS 7 peer range.

- **jsdom 30** — held at `29.x`. jsdom 30 requires Node `^22.22.2 || ^24.15.0
|| >=26.0.0`, which is above this project's `>=22.12` engines floor. Bump
  the Node floor first, then take jsdom 30.
