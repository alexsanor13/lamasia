import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
	plugins: [
		svgr({
			svgrOptions: {
				icon: true,
				ref: true,
			},
		}),
		react(),
	],
	publicDir: 'public',
	optimizeDeps: {
		include: ['react', 'react-dom'],
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@assets': path.resolve(__dirname, './src/assets'),
			'@components': path.resolve(__dirname, './src/components'),
			'@pages': path.resolve(__dirname, './src/pages'),
			'@services': path.resolve(__dirname, './src/services'),
			'@styles': path.resolve(__dirname, './src/styles'),
		},
	},
})