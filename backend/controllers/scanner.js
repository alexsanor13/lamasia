const scannerRouter = require('express').Router()

// Models
const Event = require('../models/Event')
const Ticket = require('../models/Ticket')
const Transaction = require('../models/Transaction')

eventsRouter.get('/', async (request, response) => {
	const events = await Event.find({}).select('id title date image')
	return response.status(200).json(events)
})

eventsRouter.post('/', async (request, response, next) => {
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

module.exports = eventsRouter
