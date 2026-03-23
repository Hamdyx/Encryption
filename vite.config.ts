import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			src: path.resolve(__dirname, './src'),
			components: path.resolve(__dirname, './src/components'),
			features: path.resolve(__dirname, './src/features'),
			layout: path.resolve(__dirname, './src/layout'),
			assets: path.resolve(__dirname, './src/assets'),
			style: path.resolve(__dirname, './src/style'),
		},
	},
	server: {
		port: 3000,
	},
});
