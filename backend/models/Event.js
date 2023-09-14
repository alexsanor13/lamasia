const { Schema, model } = require('mongoose')

const eventSchema = new Schema({
	id: Number,
	title: String,
	date: Date,
	scheduleTime: String,
	image: String,
	description: String,
	location: String,
	locationMap: String,
	locationDescription: String,
	price1: Number,
	price2: Number,
	priceFinal: Number,
	release1: Number,
	release2: Number,
	release3: Number,
	priceVIP: {
		type: Number,
		default: 100,
	},
})

eventSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		delete returnedObject._id
		delete returnedObject.__v
	},
})

const Event = model('Event', eventSchema)

module.exports = Event
