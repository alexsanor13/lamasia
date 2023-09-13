const eventsRouter = require('express').Router()

// Models
const Event = require('../models/Event')
const { throwErrors } = require('../utils/middleware/throwErrors')

eventsRouter.get('/', async (request, response) => {
	const events = await Event.find({}).select('id title date image')
	return response.status(200).json(events)
})

eventsRouter.post('/', async (request, response) => {
	try {
		const { id } = request.body
		const event = await Event.findOne({ id: id }).lean()

		if (event) {
			return response.status(200).json(event)
		} else {
			throwErrors(`Event with id ${id} not found`)
		}
	} catch (error) {
		return response.status(404).json({ error })
	}
})

module.exports = eventsRouter
