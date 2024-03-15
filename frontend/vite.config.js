import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
	plugins: [svgr(), react()],
	publicDir: '/public',
	build: {
		copyPublicDir: false,
		chunkSizeWarningLimit: 1000,
	},
})
