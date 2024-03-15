import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
	plugins: [svgr(), react()],
	publicDir: '/public',
	build: {
		// Exclude images for minification
		assetsInclude: ['favicon.ico', 'logo.png', 'scanner-beep.mp3'],
	},
})
