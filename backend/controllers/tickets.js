const Ticket = require('../models/Ticket')
const Transaction = require('../models/Transaction')
const Event = require('../models/Event')

const ticketsRouter = require('express').Router()

ticketsRouter.post('/', async (request, response) => {
	try {
		const body = request.body
		let eventExist = await Event.exists({ id: body.eventId })
		if (eventExist) {
			const transaction = new Transaction({
				email: body.email,
				amount: body.amount,
				tickets: body.tickets,
				purchaseInfo: body.purchaseInfo,
				date: body.date || new Date(),
			})

			await transaction.save()

			let savedTickets = []
			const ticketExtras = body.purchaseInfo.split(',')

			for (let i = 0; i < body.tickets; i++) {
				const ticket = new Ticket({
					transactionId: transaction._id,
					eventId: body.eventId,
					qrCode: '',
					created: new Date(),
					redeemed: false,
					extra: i < ticketExtras.length ? ticketExtras[i] : '',
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
