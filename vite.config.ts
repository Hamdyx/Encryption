import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [
		react(),
		// npm run analyze — opt-in bundle-size report, not part of the default build
		process.env.ANALYZE === 'true' &&
			visualizer({
				filename: 'dist/stats.html',
				gzipSize: true,
			}),
	],
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
