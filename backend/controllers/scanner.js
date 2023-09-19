const scannerRouter = require('express').Router()
const qrCrypt = require('../utils/qrManager/qrCrypt')
const { generateQRScanHTML } = require('../utils/qrManager/htmlGenerator')
const { throwErrors } = require('../utils/middleware/throwErrors')

// Models
const Event = require('../models/Event')
const Ticket = require('../models/Ticket')
const Transaction = require('../models/Transaction')
const QR = require('../models/QR')

// TODO eliminar una vez pasada la fiesta, chapuza pq fallo la creación de QRs el primer dia y se crearon manualmente
const exceptions = [
	'179131627',
	'993871575',
	'610874634',
	'206000074',
	'219158009',
	'587368786',
	'901830490',
	'636348382',
	'964975842',
	'862297562',
	'104918844',
	'830608545',
	'467640552',
	'643943270',
	'642991002',
	'464449183',
	'157383426',
	'189511474',
	'287860013',
]

async function handleQR(ticket) {
	try {
		// TODO PARCHE PRIMER DIA
		if (ticket.email === 'QR Generado manualmente') {
			return true
		}
		const existingQR = await QR.findOne({ ticketId: ticket.id })

		if (!existingQR) {
			throwErrors(`QR not found for ticket ${ticket.id}`, 'handleQR')
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
		console.log('POST scanQR')

		const { encryptedQR } = request.body
		const decryptedQR = qrCrypt.decrypt(encryptedQR)
		const decryptedQRSplitted = decryptedQR.split(',')

		if (decryptedQRSplitted.length !== 4) {
			throwErrors(
				'QR code format is incorrect',
				`scannerRouter.post('/scanQR')`
			)
		}

		const [ticketId, email, eventId, isPack] = decryptedQRSplitted

		let qrInfo = null

		if (exceptions.includes(ticketId)) {
			qrInfo = {
				transactionId: 0,
				email: 'QR Generado manualmente',
				eventName: 'Pandora',
				isPack: false,
				activated: false,
			}
		} else {
			const ticketInfo = await Ticket.findOne({
				id: ticketId,
				eventId,
				packTicket: isPack,
			})

			if (!ticketInfo) {
				throwErrors('Ticket not found', `scannerRouter.post('/scanQR')`)
			}

			const transactionInfo = await Transaction.findOne({
				id: ticketInfo.transactionId,
				email,
				eventId,
			})

			if (!transactionInfo) {
				throwErrors('Transaction not found', `scannerRouter.post('/scanQR')`)
			}

			const eventInfo = await Event.findOne({
				id: eventId,
			})

			if (!eventInfo) {
				throwErrors('Event not found', `scannerRouter.post('/scanQR')`)
			}

			// Check that the QR was not already activated
			let activated = await handleQR(ticketInfo)

			qrInfo = {
				transactionId: transactionInfo.id,
				email,
				eventName: eventInfo.title,
				isPack,
				activated,
			}
		}

		const qrResult = generateQRScanHTML(qrInfo)

		return response.status(200).json(qrResult)
	} catch (error) {
		return response.status(404).json({ error, message: error.message })
	}
})

module.exports = scannerRouter
