import App from './App'
import Modal from 'react-modal'
import React from 'react'
import ReactDOM from 'react-dom/client'

const root = ReactDOM.createRoot(document.getElementById('root'))

Modal.setAppElement('#root')
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
)
