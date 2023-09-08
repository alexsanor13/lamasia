const config = require('./utils/config')

const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const eventsRouter = require('./controllers/events')
const ticketsRouter = require('./controllers/tickets')
const scannerRouter = require('./controllers/scanner')

// MongoDB
const mongoose = require('mongoose')

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
app.use(express.json())
app.use(express.static('build'))

if (config.debugMode) {
	app.use('/api/', config.apiLimiter)
}

// end-points
app.use('/api/events', eventsRouter)
app.use('/api/tickets', ticketsRouter)
app.use('/api/scanner', scannerRouter)

if (!config.debugMode) {
	app.use(express.static(path.join(__dirname, 'build')))

	app.get('*', function (req, res) {
		res.sendFile(path.join(__dirname, 'build', 'index.html'))
	})
}

module.exports = app
