import React, { useState } from 'react'
import Modal from 'react-modal'
import ticketsServices from '../services/tickets.js'

import './EmailModal.css'

// Componente EmailModal
const EmailModal = ({ isOpen, closeModal, shoppingCart }) => {
	const [email, setEmail] = useState('')
	const [confirmEmail, setConfirmEmail] = useState('')
	const [emailError, setEmailError] = useState('')
	const [matchClassName, setMatchClassName] = useState('')
	const [timeoutId, setTimeoutId] = useState(0)

	const validateEmail = async (e) => {
		e.preventDefault()
		let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
		if (!regex.test(email) || email === '' || email !== confirmEmail) {
			setEmailError(
				'Por favor, introduce una dirección de correo electrónico que sea correcta y que coincida en ambos campos'
			)
			clearTimeout(timeoutId)
			setTimeoutId(setTimeout(() => setEmailError(''), 5000))
			return false
		} else {
			setEmailError('')
			const purchaseInfo = `${shoppingCart.tickets}x${shoppingCart.price}€;${shoppingCart.packTickets}x${shoppingCart.packPrice}€;${shoppingCart.amount}€;`

			const purchaseDetails = {
				eventId: shoppingCart.eventId,
				tickets: shoppingCart.tickets,
				packTickets: shoppingCart.packTickets,
				amount: shoppingCart.amount,
				purchaseInfo,
				email,
			}
			const tpvForm = await ticketsServices.getRedsysRedirection(
				purchaseDetails
			)
			redirectToRedsys(tpvForm)
		}
	}

	const redirectToRedsys = (tpvForm) => {
		if (!tpvForm) {
			return
		}
		const dummyContainer = document.createElement('div')
		dummyContainer.innerHTML = tpvForm
		const eTPV = dummyContainer.querySelector('form')

		if (!eTPV) {
			return
		}
		document.body.appendChild(eTPV)
		eTPV.submit()
	}

	const resetStates = () => {
		setEmail('')
		setConfirmEmail('')
		setEmailError('')
		setMatchClassName('')
		setTimeoutId(0)
	}

	const handleCloseModal = (e) => {
		e.preventDefault()
		resetStates()
		closeModal()
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

	const areMatching = (match, empty) => {
		if (empty) {
			setMatchClassName('')
		} else if (match) {
			setMatchClassName('matched')
		} else {
			setMatchClassName('unmatched')
		}
	}

	const handleEmailChange = (e) => {
		setEmail(e.target.value)
		areMatching(
			confirmEmail === e.target.value,
			confirmEmail === '' || e.target.value === ''
		)
	}

	const handleConfirmChange = (e) => {
		setConfirmEmail(e.target.value)
		areMatching(email === e.target.value, e.target.value === '' || email === '')
	}

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={handleCloseModal}
			shouldCloseOnOverlayClick={true}>
			<h2>Comprar entradas</h2>

			<table className="email-modal-cart-info">
				<tbody>
					{ticketsInfo}
					{packInfo}
					{amountInfo}
				</tbody>
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
					onChange={(e) => handleEmailChange(e)}
					className={`email-input ${matchClassName}`}
				/>
				<input
					type="email"
					placeholder="Confirmar correo"
					value={confirmEmail}
					onChange={(e) => handleConfirmChange(e)}
					className={`email-input ${matchClassName}`}
				/>
				<p className="email-error">{emailError}</p>
				<div className="buttons-container">
					<button
						className="close-button buy-button"
						onClick={(e) => handleCloseModal(e)}>
						Cerrar
					</button>
					<button
						className="purchase-button buy-button"
						onClick={(e) => validateEmail(e)}>
						Continuar
					</button>
				</div>
			</form>
		</Modal>
	)
}

export default EmailModal
