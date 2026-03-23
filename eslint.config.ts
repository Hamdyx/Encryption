import { defineConfig } from 'eslint/config';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
	{ ignores: ['dist/'] },
	{
		extends: [tseslint.configs.recommended],
	},
	{
		files: ['**/*.{ts,tsx}'],
		extends: [reactHooks.configs.flat['recommended-latest']],
		plugins: {
			react,
			'simple-import-sort': simpleImportSort,
		},
		languageOptions: {
			globals: globals.browser,
			parserOptions: {
				ecmaFeatures: { jsx: true },
			},
		},
		settings: {
			react: { version: 'detect' },
		},
		rules: {
			// React
			...react.configs.flat.recommended.rules,
			...react.configs.flat['jsx-runtime'].rules,

			// TypeScript
			'@typescript-eslint/consistent-type-imports': [
				'error',
				{ prefer: 'type-imports' },
			],
			'@typescript-eslint/no-unused-vars': [
				'error',
				{ argsIgnorePattern: '^_' },
			],

			// Import sorting
			'simple-import-sort/imports': [
				'error',
				{
					groups: [
						// Type imports
						[String.raw`^.*\u0000$`],
						// External packages (react first, then other libs)
						['^react', String.raw`^@?\w`],
						// Alias imports
						['^(components|features|layout|assets|style)(/|$)'],
						// Relative imports
						[String.raw`^\.`],
					],
				},
			],
			'simple-import-sort/exports': 'error',
		},
	},
]);
