const scannerRouter = require('express').Router()
const qrCrypt = require('../utils/qrManager/qrCrypt')
const { generateQRScanHTML } = require('../utils/qrManager/htmlGenerator')

// Models
const Event = require('../models/Event')
const Ticket = require('../models/Ticket')
const Transaction = require('../models/Transaction')
const QR = require('../models/QR')

// Middleware para manejar errores
function handleError(response, error) {
	console.error('Error:', error)
	response.status(404).json({ error: error.message })
}

async function handleQR(ticket) {
	const existingQR = await QR.findOne({ ticketId: ticket.id })

	if (!existingQR) {
		throw new Error('QR not found')
	}

	if (existingQR.activated) {
		return true
	} else {
		await QR.findOneAndUpdate(
			{ ticketId: ticket.id },
			{ $set: { activated: true, activationDate: new Date() } }
		)
		return false
	}
}

// Ruta para escanear un QR
scannerRouter.post('/scanQR', async (request, response) => {
	try {
		const { encryptedQR } = request.body
		const decryptedQR = qrCrypt.decrypt(encryptedQR)
		const decryptedQRSplitted = decryptedQR.split(',')

		if (decryptedQRSplitted.length !== 4) {
			throw new Error('QR code format is incorrect')
		}

		const [transactionId, email, eventId, isPack] = decryptedQRSplitted

		const transactionInfo = await Transaction.findOne({
			id: transactionId,
			email,
			eventId,
		})

		if (!transactionInfo) {
			throw new Error('Transaction not found')
		}

		const eventInfo = await Event.findOne({
			id: eventId,
		})

		if (!eventInfo) {
			throw new Error('Event not found')
		}

		const ticketInfo = await Ticket.findOne({
			transactionId,
		})

		if (!ticketInfo) {
			throw new Error('Ticket not found')
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
		handleError(response, error)
	}
})

module.exports = scannerRouter
