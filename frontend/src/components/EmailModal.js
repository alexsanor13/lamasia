import React, { useState } from 'react'
import Modal from 'react-modal'

import './EmailModal.css'

// Componente EmailModal
const EmailModal = ({ isOpen, closeModal }) => {
	const [email, setEmail] = useState('')
	const [emailError, setEmailError] = useState('')

	const validateEmail = () => {
		let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
		if (!regex.test(email)) {
			setEmailError('Please enter a valid email')
		} else {
			setEmailError('')
			// Perform your purchasing operation here
			closeModal()
		}
	}

	return (
		<Modal isOpen={isOpen} onRequestClose={closeModal}>
			<h2>Buy Tickets</h2>
			<form>
				<input
					type="text"
					placeholder="Enter your email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<p>{emailError}</p>
				<button onClick={validateEmail}>Submit</button>
			</form>
			<button onClick={closeModal}>close</button>
		</Modal>
	)
}

export default EmailModal
