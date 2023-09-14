const { QR_CONTAINER } = require('../utils/config')

const Ticket = require('../models/Ticket')
const Transaction = require('../models/Transaction')
const Event = require('../models/Event')
const Order = require('../models/Order')
const QR = require('../models/QR')

const { throwErrors } = require('../utils/middleware/throwErrors')
const { generateQRCode } = require('../utils/qrManager/qrCreator')
const { encrypt } = require('../utils/qrManager/qrCrypt')
const {
	getPaymentParameters,
	createRedirection,
} = require('../utils/payment/payment')

const { sendEmailByGmail } = require('../utils/email/sendEmail')

const ticketsRouter = require('express').Router()

ticketsRouter.post('/getRedirection', async (request, response) => {
	try {
		const body = request.body
		const paymentMethod = body.payment_method ? body.payment_method : ''

		const { form, actionURL, orderId } = await createRedirection(
			body.amount,
			body.email,
			body.eventId,
			paymentMethod
		)

		await createNewTransaction(body, orderId)
		return response.status(200).json({ form, actionURL })
	} catch (error) {
		return response.status(404).json({ error, message: error.message })
	}
})

ticketsRouter.post('/redsysresponse', async (request, response) => {
	try {
		const body = request.body

		const { Ds_Order } = getPaymentParameters(body)

		if (!Ds_Order) {
			Order.updateOne(
				{ orderId: Ds_Order },
				{ $set: { status: 'PAYMENT_FAILED' } }
			)
			throwErrors(`Payment for order ${Ds_Order} failed`)
		}

		console.log(`Payment for order ${Ds_Order} succeded`)
		Order.updateOne(
			{ orderId: Ds_Order },
			{ $set: { status: 'PAYMENT_SUCCEDED' } }
		)

		const transactionInfo = await Transaction.findOne({ orderId: Ds_Order })

		if (!transactionInfo) {
			throwErrors(`Transaction for order ${Ds_Order} not found`)
		}

		const newTickets = await createNewTickets(transactionInfo)

		if (!newTickets.length) {
			throwErrors(`Error creating tickets in order ${Ds_Order}`)
		}

		const event = await Event.findOne({
			id: transactionInfo.eventId,
		}).select('title')

		sendEmailByGmail(transactionInfo.email, newTickets, event.title, Ds_Order)
		return response.status(200).json()
	} catch (error) {
		return response.status(404).json({ error, message: error.message })
	}
})

const createNewTransaction = async (body, orderId) => {
	try {
		const { email, amount, tickets, packTickets, purchaseInfo, eventId } = body

		const transaction = new Transaction({
			id: generateRandomNumericCode(),
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
	} catch (e) {
		throwErrors(`Error saving the new transaction with orderId ${orderId}`)
	}
}

async function createAndSaveTicket(transactionId, eventId, email, isPack) {
	const newTicket = await saveTicket(transactionId, eventId, isPack)
	const qrText = await createQR(email, newTicket.id, eventId, isPack)
	const newQR = await saveQR(newTicket.id, qrText)
	return { ticket: newTicket, qr: newQR }
}

const createNewTickets = async (body) => {
	try {
		const { id, eventId, email, tickets, packTickets } = body

		let savedTickets = []

		// Pack tickets
		for (let packIndex = 0; packIndex < packTickets; packIndex++) {
			const newTicket = await createAndSaveTicket(id, eventId, email, true)
			savedTickets.push(newTicket)
		}

		// Standard tickets
		for (let ticketIndex = 0; ticketIndex < tickets; ticketIndex++) {
			const newTicket = await createAndSaveTicket(id, eventId, email, false)
			savedTickets.push(newTicket)
		}

		return savedTickets
	} catch {
		throwErrors(`Tickets creation for transaction ${id} failed`)
	}
}

const createQR = async (email, ticketId, eventId, pack) => {
	try {
		const qrName = `${convertEmailToFileName(email)}_${ticketId}`
		const qrPath = `${QR_CONTAINER}${qrName}`
		const qrMessage = `${ticketId},${email},${eventId},${pack}`
		const qrEncripted = encrypt(qrMessage)

		await generateQRCode(qrEncripted, qrPath)

		return qrName
	} catch (error) {
		throwErrors(`Error creating QR: ${error}`)
	}
}

const saveTicket = async (transactionId, eventId, isPack) => {
	try {
		const ticket = new Ticket({
			id: generateRandomNumericCode(),
			transactionId: transactionId,
			eventId: eventId,
			creationDate: new Date(),
			packTicket: isPack,
		})
		await ticket.save()
		return ticket
	} catch (error) {
		throwErrors('Error saving Ticket')
	}
}

const saveQR = async (ticketId, qrName) => {
	try {
		const qr = new QR({
			ticketId,
			qrName,
		})

		await qr.save()
		return qr
	} catch (error) {
		throwErrors('Error saving QR')
	}
}

const convertEmailToFileName = (email) => {
	const [username] = email.split('@')
	const validFileName = username.replace(/[^a-zA-Z0-9_-]/g, '_') // Replace unvalid char with "_"
	return validFileName
}

function generateRandomNumericCode() {
	const min = 100000000 // Valor mínimo de 100,000,000
	const max = 999999999 // Valor máximo de 999,999,999
	const ticketCode = Math.floor(Math.random() * (max - min + 1)) + min
	return ticketCode.toString() // Convertir el número en una cadena de texto
}

module.exports = ticketsRouter
