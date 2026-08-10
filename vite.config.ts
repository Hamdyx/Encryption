import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [react()],
	resolve: {
		// Path aliases come from tsconfig.json "paths" — the single source.
		tsconfigPaths: true,
	},
	server: {
		port: 3000,
	},
	test: {
		environment: 'jsdom',
		globals: true,
		setupFiles: ['src/test/setup.ts'],
	},
});
