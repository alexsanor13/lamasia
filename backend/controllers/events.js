const eventsRouter = require('express').Router()

// Models
const Event = require('../models/Event')
const EventDetail = require('../models/EventDetail')

eventsRouter.get('/', async (request, response) => {
	const events = await Event.find({})
	return response.status(200).json(events)
})

eventsRouter.post('/', async (request, response, next) => {
	try {
		const { id } = request.body // Aquí cambiamos request.params por request.body
		const event = await EventDetail.findOne({ id: id }).lean()

		if (event) {
			return response.status(200).json(event)
		} else {
			return response.status(404).json({ error: 'Event not found.' })
		}
	} catch (error) {
		next(error)
	}
})

module.exports = eventsRouter
