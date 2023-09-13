const scannerRouter = require('express').Router()
const qrCrypt = require('../utils/qrManager/qrCrypt')
const { generateQRScanHTML } = require('../utils/qrManager/htmlGenerator')
const { throwErrors } = require('../utils/middleware/throwErrors')

// Models
const Event = require('../models/Event')
const Ticket = require('../models/Ticket')
const Transaction = require('../models/Transaction')
const QR = require('../models/QR')

function handleError(response, error) {
	console.error('Error:', error)
	response.status(404).json({ error })
}

async function handleQR(ticket) {
	try {
		const existingQR = await QR.findOne({ ticketId: ticket.id })

		if (!existingQR) {
			throwErrors(`QR not found for ticket ${ticket.id}`)
		}

		if (existingQR?.activated) {
			return true
		} else {
			await QR.findOneAndUpdate(
				{ ticketId: ticket.id },
				{ $set: { activated: true, activationDate: new Date() } }
			)
			return false
		}
	} catch (e) {
		throw e
	}
}

scannerRouter.post('/scanQR', async (request, response) => {
	try {
		const { encryptedQR } = request.body
		const decryptedQR = qrCrypt.decrypt(encryptedQR)
		const decryptedQRSplitted = decryptedQR.split(',')

		if (decryptedQRSplitted.length !== 4) {
			throwErrors('QR code format is incorrect')
		}

		const [transactionId, email, eventId, isPack] = decryptedQRSplitted

		const transactionInfo = await Transaction.findOne({
			id: transactionId,
			email,
			eventId,
		})

		if (!transactionInfo) {
			throwErrors('Transaction not found')
		}

		const ticketInfo = await Ticket.findOne({
			transactionId,
		})

		if (!ticketInfo) {
			throwErrors('Ticket not found')
		}

		const eventInfo = await Event.findOne({
			id: eventId,
		})

		if (!eventInfo) {
			throwErrors('Event not found')
		}

		// Check that the QR was not already activated
		let activated = await handleQR(ticketInfo)

		const qrInfo = {
			transactionId,
			email,
			eventName: eventInfo.title,
			isPack,
			activated,
		}

		const qrResult = generateQRScanHTML(qrInfo)

		return response.status(200).json(qrResult)
	} catch (error) {
		return response.status(404).json({ error })
	}
})

module.exports = scannerRouter
