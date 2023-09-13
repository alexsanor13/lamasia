const eventsRouter = require('express').Router()

// Models
const Event = require('../models/Event')

const { throwErrors } = require('../utils/middleware/throwErrors')

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

		const soldTickets = await getTicketAlreadySold(id)

		if (soldTickets < 50) {
			event.price = event.price1
		} else if (soldTickets >= 50 && soldTickets < 100) {
			event.price = event.price2
		} else {
			event.price = event.priceFinal
		}

		delete event.price1
		delete event.price2
		delete event.priceFinal

		return response.status(200).json(event)
	} catch (error) {
		return response.status(404).json({ error })
	}
})

const getTicketAlreadySold = async (eventId) => {
	const Ticket = require('../models/Ticket')
	const soldTickets = await Ticket.find({ eventId: eventId })
	return soldTickets.length
}

module.exports = eventsRouter
