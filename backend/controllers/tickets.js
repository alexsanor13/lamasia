const Ticket = require('../models/Ticket')
const Transaction = require('../models/Transaction')
const Event = require('../models/Event')
const Order = require('../models/Order')
const QR = require('../models/QR')
const { generateQRCode } = require('../utils/qrManager/qrCreator')
const { generateQRScanHTML } = require('../utils/qrManager/htmlGenerator')
const { QR_CONTAINER } = require('../utils/config')
const { encrypt } = require('../utils/qrManager/qrCrypt')

const {
	getPaymentParameters,
	createRedirection,
} = require('../utils/payment/payment')

const { sendMailWithQR } = require('../utils/email/sendEmail')
const ticketsRouter = require('express').Router()

ticketsRouter.post('/getRedirection', async (request, response) => {
	try {
		const body = request.body
		const paymentMethod = body.payment_method ? body.payment_method : ''

		const { form, orderId } = await createRedirection(
			body.amount,
			body.email,
			body.eventId,
			paymentMethod
		)

		// createQR(body.email, body.eventId, 12345, true)
		// sendMailWithQR(
		// 	'alekox97@gmail.com',
		// 	[
		// 		{
		// 			ticket: {
		// 				id: 1,
		// 				packTicket: true,
		// 			},
		// 			qr: {
		// 				qrName: 'alex_4',
		// 			},
		// 		},
		// 	],
		// 	'Hola pepe',
		// 	'havd1342352'
		// )

		// await createNewTransaction(body, orderId)
		// return response.status(200).json(form)
	} catch (error) {
		console.error(error)
		return response.status(404).json({ error })
	}
})

ticketsRouter.post('/redsysresponse', async (request, response) => {
	try {
		const body = request.body

		const { Ds_Order } = getPaymentParameters(body)

		if (!Ds_Order) {
			console.log(`Payment for order ${Ds_Order} failed`)
			Order.updateOne(
				{ orderId: Ds_Order },
				{ $set: { status: 'PAYMENT_FAILED' } }
			)
			return response.status(500).json(new Error('Payment not completed'))
		}

		console.log(`Payment for order ${Ds_Order} succeded`)
		Order.updateOne(
			{ orderId: Ds_Order },
			{ $set: { status: 'PAYMENT_SUCCEDED' } }
		)

		const transactionInfo = await Transaction.findOne({ orderId: Ds_Order })

		if (!transactionInfo) {
			return
		}

		const newTickets = await createNewTickets(transactionInfo)

		if (!newTickets.length) {
			throw Error('Error creating tickets')
		}

		const eventName = await Event.findOne({
			id: transactionInfo.eventId,
		}).select('title')

		sendMailWithQR(transactionInfo.email, newTickets, eventName, Ds_Order)
		return response.status(200).json()
	} catch (error) {
		console.error(error)
		return response.status(404).json({ error })
	}
})

ticketsRouter.get('/redsysresponseok', async (request, response) => {
	try {
		// savePayment(body)
		return response.status(200).json()
	} catch (error) {
		console.error(error)
		return response.status(404).json({ error })
	}
})

ticketsRouter.get('/redsysresponseko', async (request, response) => {
	try {
		// savePayment(body)
		return response.status(200).json()
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

const convertEmailToFileName = (email) => {
	const [username] = email.split('@')
	const validFileName = username.replace(/[^a-zA-Z0-9_-]/g, '_') // Replace unvalid char with "_"
	return validFileName
}

const createQR = async (email, transactionId, eventId, pack) => {
	try {
		const qrName = `${convertEmailToFileName(email)}_${id}`
		const qrPath = `${QR_CONTAINER}${qrName}`
		const qrMessage = `${transactionId},${email},${eventId},${pack}`
		const qrEncripted = encrypt(qrMessage)
		const qrHtml = generateQRScanHTML(qrEncripted)

		await generateQRCode(qrHtml, qrPath)

		return qrName
	} catch (error) {
		throw new Error('QR creation error')
	}
}

const saveTicket = async (transactionId, eventId, isPack) => {
	try {
		const ticket = new Ticket({
			id: generateRandomCode(),
			transactionId: transactionId,
			eventId: eventId,
			creationDate: new Date(),
			packTicket: isPack,
		})
		await ticket.save()
		return ticket
	} catch (error) {
		throw new Error('Error saving Ticket')
	}
}

const saveQR = async ({ ticketId, qrName }) => {
	try {
		const qr = {
			ticketId,
			qrName: qrName,
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

async function createAndSaveTicket(transactionId, eventId, email, isPack) {
	const qrText = await createQR(email, transactionId, eventId, isPack)
	const newTicket = await saveTicket(transactionId, eventId, isPack)
	const newQR = await saveQR({ ticketId: newTicket.id, qrText })
	return { ticket: newTicket, qr: newQR }
}

const createNewTransaction = async (body, orderId) => {
	const { email, amount, tickets, packTickets, purchaseInfo, eventId } = body

	const transaction = new Transaction({
		id: generateRandomCode(),
		email,
		amount,
		tickets,
		packTickets,
		purchaseInfo,
		date: new Date(),
		orderId,
		eventId,
	})

	await transaction.save()
}

const createNewTickets = async (body) => {
	try {
		const { id, eventId, email, tickets, packTickets } = body

		let savedTickets = []

		// Pack tickets
		for (let packIndex = 0; packIndex < packTickets; packIndex++) {
			const newTicket = createAndSaveTicket(id, eventId, email, true)
			savedTickets.push(newTicket)
		}

		// Standard tickets
		for (let ticketIndex = 0; ticketIndex < tickets; ticketIndex++) {
			const newTicket = createAndSaveTicket(id, eventId, email, false)
			savedTickets.push(newTicket)
		}

		return savedTickets
	} catch {
		console.error('Tickets not saved')
	}
}

function generateRandomCode() {
	const min = 100000000 // Valor mínimo de 100,000,000
	const max = 999999999 // Valor máximo de 999,999,999
	const ticketCode = Math.floor(Math.random() * (max - min + 1)) + min
	return ticketCode.toString() // Convertir el número en una cadena de texto
}

module.exports = ticketsRouter
