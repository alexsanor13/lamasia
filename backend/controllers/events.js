const eventsRouter = require('express').Router()

// Models
const Event = require('../models/Event')

eventsRouter.get('/', async (request, response) => {
	const events = await Event.find({})
	return response.status(200).json(events)
})

eventsRouter.get('/:id', async (request, response, next) => {
	try {
		const events = await Event.find({}, { _id: 0, __v: 0 }).lean()
		events.forEach((event) => {
			event.date = new Date(event.date)
		})
		return response.status(200).json(events)
	} catch (error) {
		next(error)
	}
})

// eventsRouter.delete('/:id', async (request, response, next) => {
// 	try {
// 		const { userId } = request
// 		const id = request.params.id

// 		const user = await User.findById(userId)
// 		const noteToDelete = await Note.findById(id)

// 		const userNotes = user.notes.filter((note) => {
// 			note !== noteToDelete._id
// 		})
// 		user.notes = userNotes

// 		await user.save()
// 		await Note.findByIdAndRemove(id)
// 		response.status(204).end()
// 	} catch (error) {
// 		next(error)
// 	}
// })

// eventsRouter.post('/', async (request, response, next) => {
// 	try {
// 		const { userId } = request
// 		const user = await User.findById(userId)

// 		const note = request.body
// 		if (!note || !note.content) {
// 			return response.status(400).json({
// 				error: 'note.content is missing',
// 			})
// 		}

// 		const newNote = new Note({
// 			content: note.content,
// 			date: new Date(),
// 			important: note.important || false,
// 			user: user._id,
// 		})

// 		const savedNote = await newNote.save()
// 		user.notes = user.notes.concat(savedNote._id)
// 		await user.save()
// 		savedNote.user = user
// 		response.status(201).json(savedNote)
// 	} catch (error) {
// 		next(error)
// 	}
// })

// eventsRouter.put('/:id', async (request, response, next) => {
// 	const id = request.params.id
// 	const note = request.body

// 	const newNoteInfo = {
// 		content: note.content,
// 		important: note.important,
// 	}

// 	try {
// 		// El objeto nuevo se devuelve cuando especificas el tercer argumento,
// 		// de normal te devuelve el objeto que se actualiza
// 		let noteUpdated = await Note.findByIdAndUpdate(id, newNoteInfo, {
// 			new: true,
// 		}).populate('user', { username: 1, name: 1 })
// 		response.status(200).json(noteUpdated)
// 	} catch (error) {
// 		next(error)
// 	}
// })

module.exports = eventsRouter
