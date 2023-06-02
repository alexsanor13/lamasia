const { Schema, model } = require('mongoose')

const eventSchema = new Schema({
	id: Number,
	title: String,
	date: {
		type: Date,
		default: Date.now,
	},
	image: String,
	description: String,
	location: String,
	locationMap: String,
	locationDescription: String,
	price: Number,
	extras: String,
})

eventSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		delete returnedObject._id
		delete returnedObject.__v
	},
})

const Event = model('Event', eventSchema)

module.exports = Event
