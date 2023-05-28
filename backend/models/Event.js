const { Schema, model } = require('mongoose')

const eventSchema = new Schema({
	id: Number,
	title: String,
	date: String,
	image: String,
	placeholder: String,
})

eventSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id
		delete returnedObject._id
		delete returnedObject.__v
	},
})

const Event = model('Event', eventSchema)

module.exports = Event
