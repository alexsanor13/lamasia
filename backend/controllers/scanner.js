const scannerRouter = require('express').Router()
const qrCrypt = require('../utils/qrManager/qrCrypt')
const { generateQRScanHTML } = require('../utils/qrManager/htmlGenerator')
const { throwErrors } = require('../utils/middleware/throwErrors')

// Models
const Event = require('../models/Event')
const Ticket = require('../models/Ticket')
const Transaction = require('../models/Transaction')
const QR = require('../models/QR')

// const exceptions = [
// 	'179131627', // martinamoncada15@gmail.com, 		id:461733774, eventId:5, amount:8, tickets: 1, purchaseInfo: "QRManual",
// 	'993871575', // mireiavivet@gmail.com, 				id:461733775, eventId:5, amount:8, tickets: 1, purchaseInfo: "QRManual",
// 	'610874634', // ainagarciaa10@gmail.com, 			id:461733776, eventId:5, amount:8, tickets: 1, purchaseInfo: "QRManual",
// 	'206000074', // lauraurbano2204@gmail.com, 			id:461733777, eventId:5, amount:8, tickets: 1, purchaseInfo: "QRManual",
// 	'219158009', // m1202vc@gmail.com, 					id:461733778, eventId:5, amount:8, tickets: 1, purchaseInfo: "QRManual",
// 	'587368786', // m1202vc@gmail.com, 					id:461733778, eventId:5, amount:16, tickets: 2, purchaseInfo: "QRManual",
// 	'901830490', // lucia.larrosa.joliver@gmail.com, 	id:461733780, eventId:5, amount:8, tickets: 1, purchaseInfo: "QRManual",
// 	'636348382', // nil.gomez.11@gmail.com, 			id:461733781, eventId:5, amount:8, tickets: 1, purchaseInfo: "QRManual",
// 	'964975842', // carlapego02@gmail.com, 				id:461733783, eventId:5, amount:8, tickets: 1, purchaseInfo: "QRManual",
// 	'862297562', // carlapego02@gmail.com, 				id:461733783, eventId:5, amount:16, tickets: 2, purchaseInfo: "QRManual",
// 	'104918844', // aifergu8@gmail.com, 				id:461733784, eventId:5, amount:8, tickets: 1, purchaseInfo: "QRManual",
// 	'830608545', // juliasensio.f@gmail.com, 			id:461733785, eventId:5, amount:8, tickets: 1, purchaseInfo: "QRManual",
// 	'467640552', // ncastrobotey@gmail.com, 			id:461733787, eventId:5, amount:8, tickets: 1, purchaseInfo: "QRManual",
// 	'643943270', // ncastrobotey@gmail.com, 			id:461733787, eventId:5, amount:16, tickets: 2, purchaseInfo: "QRManual",
// 	'642991002', // iraitzl98@gmail.com, 				id:461733788, eventId:5, amount:8, tickets: 1, purchaseInfo: "QRManual",
// 	'464449183', // gerardvicedo21@gmail.com, 			id:461733789, eventId:5, amount:10, tickets: 1, purchaseInfo: "QRManual",
// 	'157383426', // queraltuceda@gmail.com, 			id:461733790, eventId:5, amount:30, tickets: 3, purchaseInfo: "QRManual",
// 	'189511474', // queraltuceda@gmail.com, 			id:461733790, eventId:5, amount:8, tickets: 1, purchaseInfo: "QRManual",
// 	'287860013', // queraltuceda@gmail.com, 			id:461733790, eventId:5, amount:8, tickets: 1, purchaseInfo: "QRManual",
// ]

async function handleQR(ticket) {
	try {
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

		const qrResult = generateQRScanHTML(qrInfo)

		return response.status(200).json(qrResult)
	} catch (error) {
		return response.status(404).json({ error, message: error.message })
	}
})

module.exports = scannerRouter
