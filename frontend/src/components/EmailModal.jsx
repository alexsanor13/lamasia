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
			const purchaseInfo = `${shoppingCart.tickets}x${shoppingCart.price}€=${shoppingCart.amount}€`

			const purchaseDetails = {
				eventId: shoppingCart.eventId,
				tickets: shoppingCart.tickets,
				packTickets: shoppingCart.packTickets,
				amount: shoppingCart.amount,
				purchaseInfo,
				email,
			}
			const tpvInfo = await ticketsServices.getRedsysRedirection(
				purchaseDetails
			)

			if (tpvInfo.form && tpvInfo.actionURL) {
				redirectToRedsys(tpvInfo)
			}
		}
	}

	const redirectToRedsys = (tpvInfo) => {
		const form = document.createElement('form')
		form.method = 'POST'
		form.action = tpvInfo.actionURL

		form.innerHTML = tpvInfo.form

		document.body.appendChild(form)
		form.submit()
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

	const ticketsAmount = shoppingCart.tickets ? (
		<tr>
			<td>
				<b>Entrada estándard *</b>
			</td>
			<td className="amount">
				{shoppingCart.tickets} x {shoppingCart.price}€
			</td>
		</tr>
	) : (
		''
	)

	const ticketsInfo = shoppingCart.tickets ? (
		<tr className="standardTicketInfo">
			<td colSpan="2">* Acceso al recinto y canjeable por una consumición.</td>
		</tr>
	) : (
		''
	)

	const packAmount = shoppingCart.packTickets ? (
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
			<td className="totalTD">
				<b>Total</b>
			</td>
			<td className="amount totalTD">{shoppingCart.amount}€</td>
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
			shouldCloseOnOverlayClick={false}>
			<h2>Comprar entradas</h2>

			<table className="email-modal-cart-info">
				<tbody>
					{ticketsAmount}
					{ticketsInfo}
					{packAmount}
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
