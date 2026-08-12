# Encryption App

[![CI](https://github.com/Hamdyx/Encryption/actions/workflows/ci.yml/badge.svg)](https://github.com/Hamdyx/Encryption/actions/workflows/ci.yml)

A small web app for generating random passwords and encrypting/decrypting text with a Caesar cipher.

## Routes

| Path         | Description                         |
| ------------ | ----------------------------------- |
| `/`          | Landing page                        |
| `/generator` | Random password generator           |
| `/cipher`    | Caesar cipher encryption/decryption |

## Stack

- React 19
- TypeScript
- Vite
- Vitest
- SCSS

## Requirements

- Node >= 22.12 (see `.nvmrc`)

## Available Scripts

| Script                 | Description                                                    |
| ---------------------- | -------------------------------------------------------------- |
| `npm start`            | Runs the app in development mode (Vite dev server)             |
| `npm run build`        | Type-checks and builds the app for production into `dist/`     |
| `npm run preview`      | Serves the production build locally                            |
| `npm run analyze`      | Builds and generates a bundle-size report at `dist/stats.html` |
| `npm run lint`         | Lints the codebase with ESLint                                 |
| `npm run lint:fix`     | Lints and auto-fixes issues                                    |
| `npm run format`       | Formats the codebase with Prettier                             |
| `npm run format:check` | Checks formatting without writing changes                      |
| `npm run typecheck`    | Type-checks the codebase without emitting output               |
| `npm test`             | Runs the test suite once with Vitest                           |
| `npm run test:watch`   | Runs the test suite in Vitest watch mode                       |

## CI

GitHub Actions (`.github/workflows/ci.yml`) runs on every pull request and on
pushes to `main`, executing five gates in sequence: `npm run format:check`,
`npm run lint`, `npm run typecheck`, `npm test`, and `npm run build`.

## Deployment

Deployed on [Vercel](https://vercel.com/), configured via `vercel.json` (SPA
routing, cache headers, security headers). Build output is `dist/`.
