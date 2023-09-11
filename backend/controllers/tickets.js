const Ticket = require('../models/Ticket')
const Transaction = require('../models/Transaction')
const Event = require('../models/Event')
const QR = require('../models/QR')
const { generateQRCode } = require('../utils/qrManager/qrCreator')
const { generateQRScanHTML } = require('../utils/qrManager/htmlGenerator')
const { QR_CONTAINER } = require('../utils/config')
const {
	processPayment,
	createPayment,
	generateOrderId,
} = require('../utils/payment/payment')

const ticketsRouter = require('express').Router()

const convertEmailToFileName = (email) => {
	const [username] = email.split('@')
	const validFileName = username.replace(/[^a-zA-Z0-9_-]/g, '_') // Replace unvalid char with "_"
	return validFileName
}

const createQR = async (email, id, eventId, pack) => {
	try {
		const qrPath = `${QR_CONTAINER}${convertEmailToFileName(email)}_${id}`
		const qrMessage = `Transaction: ${id} - ${email} - Entrada ${
			pack ? 'especial' : 'normal'
		} para evento ${eventId}`
		const qrHtml = generateQRScanHTML(qrMessage)

		await generateQRCode(qrHtml, qrPath)

		return qrText
	} catch (error) {
		throw new Error('QR creation error')
	}
}

const saveTicket = async (paymentId, eventId, qrText, isPack) => {
	try {
		const ticket = new Ticket({
			transactionId: paymentId,
			eventId: eventId,
			qrCode: qrText,
			created: new Date(),
			packTicket: isPack,
		})
		await ticket.save()
		return ticket
	} catch (error) {
		throw new Error('Error saving Ticket')
	}
}

const saveQR = async ({ ticketId, qrText }) => {
	try {
		const qr = {
			ticketId,
			qrCode: qrText,
			creationDate: new Date(),
			activated: false,
			activationDate: null,
		}
		await qr.save()
		return qr
	} catch (error) {
		throw Error('Error saving QR')
	}
}

function createAndSaveTicket(paymentId, eventId, email, tickets, isPack) {
	const qrText = createQR(email, paymentId, eventId, tickets > 0)
	const newTicket = saveTicket(paymentId, eventId, qrText, isPack)
	const newQR = saveQR({ ticketId: newTicket._id, qrText })
	return { ticket: newTicket, qr: newQR }
}

const createNewTransaction = async (body) => {
	try {
		const {
			paymentId,
			eventId,
			email,
			amount,
			tickets,
			packTickets,
			purchaseInfo,
		} = body

		const transaction = new Transaction({
			id: paymentId,
			email: email,
			amount: amount,
			tickets: tickets,
			packTickets: packTickets,
			purchaseInfo: purchaseInfo,
			date: new Date(),
		})

		await transaction.save()

		let savedTickets = []
		let savedQR = []

		// Pack tickets
		for (let packIndex = 0; packIndex < tickets; packIndex++) {
			const { ticket, qr } = createAndSaveTicket(
				paymentId,
				eventId,
				email,
				tickets,
				true
			)
			savedTickets.push(ticket)
			savedQR.push(qr)
		}

		// Standard tickets
		for (let ticketIndex = 0; ticketIndex < tickets; ticketIndex++) {
			const { ticket, qr } = createAndSaveTicket(
				paymentId,
				eventId,
				email,
				tickets,
				false
			)
			savedTickets.push(ticket)
			savedQR.push(qr)
		}

		return { savedTickets, savedQR }
	} catch {
		console.error('Transaction not saved')
	}
}

ticketsRouter.post('/createPayment', async (request, response) => {
	try {
		const body = request.body
		let eventExist = await Event.exists({ id: body.eventId })
		if (!eventExist) {
			return
		}
		const orderId = generateOrderId(12)

		const paymentResponse = createPayment(body.amount, orderId)
		return response.status(200).json(paymentResponse)
	} catch (error) {
		console.error(error)
		return response.status(404).json({ error })
	}
})

ticketsRouter.post('/processPayment', async (request, response) => {
	try {
		const body = request.body
		const processResponse = processPayment(body)
		if (processResponse) {
			const newTransactionResponse = createNewTransaction(body)
			return response.status(200).json(newTransactionResponse)
		}
	} catch (error) {
		console.error(error)
		return response.status(404).json({ error })
	}
})

module.exports = ticketsRouter
