const config = require('./utils/config')

// Por defecto configura que cualquier origen puede acceder a la api
const express = require('express')
const app = express()
const cors = require('cors')
const eventsRouter = require('./controllers/events')
const ticketsRouter = require('./controllers/tickets')

// MongoDB
const mongoose = require('mongoose')

// conexión a mongodb
mongoose
	.connect(config.MONGO_DB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('Database connected')
	})
	.catch((err) => {
		console.error(err)
	})

process.on('uncaughtException', () => {
	mongoose.disconnect()
})

app.use(cors())

// Se incluye el front como static
// app.use(express.static('build'))
app.use(express.json())

if (config.debugMode) {
	app.use('/api/', config.apiLimiter)
}

// end-points
app.use('/api/events', eventsRouter)
app.use('/api/tickets', ticketsRouter)

module.exports = app
