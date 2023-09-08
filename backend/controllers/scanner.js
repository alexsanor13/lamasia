const scannerRouter = require('express').Router()
const qrCrypt = require('../utils/qrManager/qrCrypt')

// Models
const Event = require('../models/Event')
const Ticket = require('../models/Ticket')
const Transaction = require('../models/Transaction')

// Aquí se recibirá el id de la transacción y fecha de creación de esta. Con esos datos se creará el qr encriptado
scannerRouter.post('/createQR', async (request, response, next) => {
	try {
		const { id } = request.body
		const event = await Event.findOne({ id: id }).lean()

		if (event) {
			return response.status(200).json(event)
		} else {
			return response.status(404).json({ error: 'Event not found.' })
		}
	} catch (error) {
		next(error)
	}
})

// Se recibirá el qr encriptado y se debe:
// 1. desenciptar --> obtener la transacción
// 2. se consultará si el qr se ha validado previamente (status)
// 2. se obtendrán los datos de la transacción: fecha de compra, evento, total pagado
// 3. se obtendrá los datos del evento: titulo, fecha, dirección
// 4. se marcará el qr como validado
scannerRouter.post('/scanQR', async (request, response, next) => {
	try {
		const { encryptedQR } = request.body
		const transactionId = qrCrypt.decrypt(encryptedQR)

		// if (event) {
		// 	return response.status(200).json(event)
		// } else {
		// 	return response.status(404).json({ error: 'Event not found.' })
		// }
	} catch (error) {
		next(error)
	}
})

module.exports = scannerRouter
