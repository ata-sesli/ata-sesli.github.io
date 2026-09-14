import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		paths: {
			base: process.env.NODE_ENV === 'production' ? '' : ''
		},
		appDir: 'internal',
		adapter: adapter({
			// GitHub Pages serves static/404.html for missing paths.
		})
	}
};

export default config;
