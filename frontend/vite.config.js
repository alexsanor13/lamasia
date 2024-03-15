import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
	plugins: [svgr(), react()],
	publicDir: '/public',
	filenameHashing: false,
	build: {
		chunkSizeWarningLimit: 1000,
		rollupOptions: {
			output: {
				manualChunks: (id) => {
					if (id.includes('logo.png')) {
						return '' // Exclude logo.png
					}
				},
			},
		},
	},
})
