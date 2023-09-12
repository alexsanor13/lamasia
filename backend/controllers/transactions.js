const Transaction = require('../models/Transaction')
const Event = require('../models/Event')

const transactionsRouter = require('express').Router()

transactionsRouter.post('/getPaymentInfo', async (request, response) => {
	try {
		const { orderId } = request.body

		const transactionInfo = await Transaction.findOne({ orderId: orderId })

		if (!transactionInfo) {
			throw new Error('Transaction not found')
		}

		const eventInfo = await Event.findOne({ id: transactionInfo.eventId })

		if (!eventInfo) {
			throw new Error('Event not found')
		}

		const paymentInfo = {
			eventName: eventInfo.title,
			orderId: orderId,
			email: transactionInfo.email,
		}

		return response.status(200).json(paymentInfo)
	} catch (error) {
		console.error(error)
		return response.status(404).json({ error })
	}
})

module.exports = transactionsRouter
