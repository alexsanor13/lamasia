const { Schema, model } = require('mongoose')

const eventDetailSchema = new Schema({
	id: Number,
	title: String,
	date: String,
	image: String,
	placeholder: String,
	description: String,
	location: String,
	locationMap: String,
	locationDescription: String,
})

eventDetailSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		delete returnedObject._id
		delete returnedObject.__v
	},
})

const EventDetail = model('EventDetail', eventDetailSchema)

module.exports = EventDetail
