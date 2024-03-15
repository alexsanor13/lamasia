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
				manualChunks: undefined,
				assetFileNames: 'assets/[name].[ext]', // Output assets (e.g., images, SVGs) to the assets folder
				chunkFileNames: 'assets/[name].[ext]', // Output dynamic imports (chunks) to the assets folder
			},
		},
	},
})
