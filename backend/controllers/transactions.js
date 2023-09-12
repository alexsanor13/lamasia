const Transaction = require('../models/Transaction')
const Event = require('../models/Event')

const transactionsRouter = require('express').Router()

transactionsRouter.post('/getPaymentInfo', async (request, response) => {
	try {
		const body = request.body

		const transactionInfo = await Transaction.findOne({ orderId: Ds_Order })

		if (!transactionInfo) {
			throw new Error('Transaction not found')
		}

		const eventInfo = await Event.findOne({ id: transactionInfo.eventId })

		if (!eventInfo) {
			throw new Error('Event not found')
		}

		const response = {
			eventName: eventInfo.title,
			orderId,
			email: transactionInfo.email,
		}

		return response.status(200).json(response)
	} catch (error) {
		console.error(error)
		return response.status(404).json({ error })
	}
})

module.exports = transactionsRouter
