const { Schema, model } = require('mongoose')

const OrderSchema = new Schema({
	orderId: String,
	amount: Number,
	status: String,
	currency: String,
})

OrderSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		delete returnedObject.__v
		delete returnedObject._id
	},
})

module.exports = model('Order', OrderSchema)
