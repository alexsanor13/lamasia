const Transaction = require('../models/Transaction')
const Event = require('../models/Event')

const { throwErrors } = require('../utils/middleware/throwErrors')

const transactionsRouter = require('express').Router()

transactionsRouter.post('/getPaymentInfo', async (request, response) => {
	try {
		console.log('POST getPaymentInfo')

		const { orderId } = request.body

		const transactionInfo = await Transaction.findOne({ orderId: orderId })

		if (!transactionInfo) {
			throwErrors(
				`Transaction not found in order ${orderId}`,
				`transactionsRouter.post('/getPaymentInfo')`
			)
		}

		const eventInfo = await Event.findOne({ id: transactionInfo.eventId })

		if (!eventInfo) {
			throwErrors(
				`Event not found in order ${orderId}`,
				`transactionsRouter.post('/getPaymentInfo'`
			)
		}

		const paymentInfo = {
			eventName: eventInfo.title,
			orderId: orderId,
			email: transactionInfo.email,
		}

		return response.status(200).json(paymentInfo)
	} catch (error) {
		return response.status(404).json({ error, message: error.message })
	}
})

module.exports = transactionsRouter
