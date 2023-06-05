import React, { useState } from 'react'
import Modal from 'react-modal'

import './EmailModal.css'

// Componente EmailModal
const EmailModal = ({ isOpen, closeModal, shoppingCart }) => {
	const [email, setEmail] = useState('')
	const [confirmEmail, setConfirmEmail] = useState('')
	const [emailError, setEmailError] = useState('')

	const validateEmail = (e) => {
		e.preventDefault()
		let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
		if (!regex.test(email) || email === '' || email !== confirmEmail) {
			setEmailError(
				'Por favor, introduce una dirección de correo electrónico que sea correcta y que coincida en ambos campos'
			)
			setTimeout(() => setEmailError(''), 5000)
			return false
		} else {
			setEmailError('')
			closeModal()
		}
	}

	const ticketsInfo = shoppingCart.tickets ? (
		<tr>
			<td>
				<b>Entrada estándard</b>
			</td>
			<td>
				{shoppingCart.tickets} x {shoppingCart.price}€
			</td>
		</tr>
	) : (
		''
	)

	const packInfo = shoppingCart.packTickets ? (
		<tr>
			<td>
				<b>Entrada especial</b>
			</td>
			<td>
				{shoppingCart.packTickets} x {shoppingCart.packPrice}€
			</td>
		</tr>
	) : (
		''
	)

	const amountInfo = shoppingCart.amount ? (
		<tr>
			<td>
				<b>Total</b>
			</td>
			<td>{shoppingCart.amount}€</td>
		</tr>
	) : (
		''
	)

	return (
		<Modal isOpen={isOpen} onRequestClose={closeModal}>
			<h2>Comprar entradas</h2>

			<table className="email-modal-cart-info">
				{ticketsInfo}
				{packInfo}
				{amountInfo}
			</table>
			<p className="email-modal-info">
				Introduce una dirección de <b>correo electronico</b> válida donde se
				recibirán las entradas, después del pago.
			</p>
			<form className="email-container">
				<input
					type="email"
					placeholder="jacky@perlanegra.com"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="email-input"
				/>
				<input
					type="email"
					placeholder="Confirmar correo"
					value={confirmEmail}
					onChange={(e) => setConfirmEmail(e.target.value)}
					className="email-input"
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
