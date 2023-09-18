const eventsRouter = require('express').Router()

// Models
const Event = require('../models/Event')

const { throwErrors } = require('../utils/middleware/throwErrors')
const { getPrice } = require('../utils/events/eventsUtils')

eventsRouter.get('/', async (request, response) => {
	const events = await Event.find({})
		.select('id title date image')
		.sort({ id: -1 })

	return response.status(200).json(events)
})

eventsRouter.post('/', async (request, response) => {
	try {
		const { id } = request.body
		let event = await Event.findOne({ id: id }).lean()

		if (!event) {
			throwErrors(`Event with id ${id} not found`)
		}

		const currentDate = new Date()
		if (event.date < currentDate) {
			return response.status(400).json({ error: 'Event has already finished' })
		}

		const { price, release, priceLabel } = await getPrice(event)

		event.price = Number(price)
		event.release = release
		event.priceLabel = priceLabel

		event.releases = [
			{ price: Number(event.price1), label: 'Primera Release' },
			{ price: Number(event.price2), label: 'Segunda Release' },
			{ price: Number(event.priceFinal), label: 'Entrada General' },
		]

		delete event.price1
		delete event.price2
		delete event.priceFinal
		delete event.release1
		delete event.release2
		delete event.releaseFinal

		return response.status(200).json(event)
	} catch (error) {
		return response.status(404).json({ error, message: error.message })
	}
})

module.exports = eventsRouter
