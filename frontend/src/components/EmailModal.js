import React, { useState } from 'react'
import Modal from 'react-modal'

import './EmailModal.css'

// Componente EmailModal
const EmailModal = ({ isOpen, closeModal }) => {
	const [email, setEmail] = useState('')
	const [emailError, setEmailError] = useState('')

	const validateEmail = (e) => {
		e.preventDefault()
		let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
		if (!regex.test(email) || email === '') {
			setEmailError(
				'Porfavor, introduce una dirección de correo electrónico que sea correcta'
			)
			setTimeout(() => setEmailError(''), 5000)
			return false
		} else {
			setEmailError('')

			closeModal()
		}
	}

	return (
		<Modal isOpen={isOpen} onRequestClose={closeModal}>
			<h2>Comprar entradas</h2>
			<p className="email-modal-info">
				Introduce una dirección de <b>correo electronico</b> válida donde se
				recibirán las entradas, después del pago.
			</p>
			<form>
				<input
					type="email"
					placeholder="pirata@perlanegra.com"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<p className="email-error">{emailError}</p>
				<button className="purchase-button" onClick={(e) => validateEmail(e)}>
					PAGAR
				</button>
			</form>
		</Modal>
	)
}

export default EmailModal
