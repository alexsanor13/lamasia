const config = require('./utils/config')

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const eventsRouter = require('./controllers/events')
const ticketsRouter = require('./controllers/tickets')
const scannerRouter = require('./controllers/scanner')
const transactionsRouter = require('./controllers/transactions')

// Redirect http to https
if (!config.debugMode) {
	app.use((req, res, next) => {
		if (req.headers['x-forwarded-proto'] !== 'https') {
			return res.redirect('https://' + req.get('host') + req.url)
		}
		return next()
	})
}

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

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

if (!config.debugMode) {
	app.use('/api/', config.apiLimiter)
}

// end-points
app.use('/api/events', eventsRouter)
app.use('/api/tickets', ticketsRouter)
app.use('/api/scanner', scannerRouter)
app.use('/api/transactions', transactionsRouter)

if (!config.debugMode) {
	app.use(express.static(path.join(__dirname, 'dist')))

	app.get('*', function (req, res) {
		res.sendFile(path.join(__dirname, 'dist', 'index.html'))
	})
}

module.exports = app
