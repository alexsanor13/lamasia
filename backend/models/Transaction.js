const { Schema, model } = require('mongoose')

const TransactionSchema = new Schema({
	email: String,
	amount: Number,
	tickets: Number,
	purchaseInfo: String,
	date: {
		type: Date,
		default: Date.now,
	},
})

TransactionSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		delete returnedObject.__v
	},
})

module.exports = model('Transaction', TransactionSchema)
