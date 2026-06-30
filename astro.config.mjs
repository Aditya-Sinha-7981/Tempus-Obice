// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
	integrations: [react()],
	vite: {
		jsx: 'react-jsx',
		jsxImportSource: 'react',
	},
});