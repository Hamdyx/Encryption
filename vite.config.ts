import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			src: path.resolve(import.meta.dirname, './src'),
			components: path.resolve(import.meta.dirname, './src/components'),
			features: path.resolve(import.meta.dirname, './src/features'),
			layout: path.resolve(import.meta.dirname, './src/layout'),
			assets: path.resolve(import.meta.dirname, './src/assets'),
			style: path.resolve(import.meta.dirname, './src/style'),
		},
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
