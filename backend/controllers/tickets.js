const Ticket = require('../models/Ticket')
const Transaction = require('../models/Transaction')
const Event = require('../models/Event')
const { generateQRCode } = require('../utils/qrManager/qrCreator')
const { generateQRScanHTML } = require('../utils/qrManager/htmlGenerator')
const { QR_CONTAINER } = require('../utils/config')

const ticketsRouter = require('express').Router()

const convertEmailToFileName = (email) => {
	const [username] = email.split('@') // Obtener la parte antes del símbolo @
	const validFileName = username.replace(/[^a-zA-Z0-9_-]/g, '_') // Reemplazar caracteres no válidos con un guion bajo (_)
	return validFileName
}

const createQR = async (email, id, eventId, pack) => {
	const qrPath = `${QR_CONTAINER}${convertEmailToFileName(email)}_${id}`
	const qrMessage = `Transaction: ${id} - ${email} - Entrada ${
		pack ? 'especial' : 'normal'
	} para evento ${eventId}`
	const qrHtml = generateQRScanHTML(qrMessage)

	await generateQRCode(qrHtml, qrPath)

	return qrText
}

ticketsRouter.post('/', async (request, response) => {
	try {
		const body = request.body
		let eventExist = await Event.exists({ id: body.eventId })
		if (eventExist) {
			const transaction = new Transaction({
				email: body.email,
				amount: body.amount,
				tickets: body.tickets,
				packTickets: body.packTickets,
				purchaseInfo: body.purchaseInfo,
				date: body.date || new Date(),
			})

			await transaction.save()

			let savedTickets = []

			for (let packIndex = 0; packIndex < body.packTickets; packIndex++) {
				const qrText = createQR(
					body.email,
					transaction._id,
					body.eventId,
					body.packTickets > 0
				)

				const ticket = new Ticket({
					transactionId: transaction._id,
					eventId: body.eventId,
					qrCode: qrText,
					created: new Date(),
					redeemed: false,
					packTicket: true,
				})
				savedTickets.push(await ticket.save())
			}

			for (let ticketIndex = 0; ticketIndex < body.tickets; ticketIndex++) {
				const qrText = createQR(
					body.email,
					transaction._id,
					body.eventId,
					body.packTickets > 0
				)

				const ticket = new Ticket({
					transactionId: transaction._id,
					eventId: body.eventId,
					qrCode: qrText,
					created: new Date(),
					redeemed: false,
					packTicket: false,
				})
				savedTickets.push(await ticket.save())
			}
			return response.status(200).json(savedTickets)
		}
	} catch {
		console.error('Transaction not saved')
		return response.status(404).json({ error: 'Transaction not completed.' })
	}
})

ticketsRouter.put('/:ticketId/redeem', async (req, res) => {
	const { ticketId } = req.params

	try {
		const ticket = await Ticket.findById(ticketId)
		if (!ticket) {
			return res.status(404).json({ message: 'Ticket not found' })
		}

		ticket.redeemed = true
		await ticket.save()

		return res.status(200).json(ticket)
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
})

module.exports = ticketsRouter
