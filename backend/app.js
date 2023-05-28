const config = require('./utils/config')

// Por defecto configura que cualquier origen puede acceder a la api
const express = require('express')
const app = express()
const cors = require('cors')
const eventsRouter = require('./controllers/events')

// Middlewares
// const handleErrors = require('./utils/middleware/handleErrors')
// const notFound = require('./utils/middleware/notFound')
// const logger = require('./utils/consoleLogger')
// const userExtractor = require('./utils/middleware/userExtractor')

// MongoDB
const mongoose = require('mongoose')

// const connectionString =
// 	config.NODE_ENV === 'test' ? config.MONGO_DB_URI_TEST : config.MONGO_DB_URI

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

// end-points
// app.use('/api/notes', userExtractor, notesRouter)
// app.use('/api/users', usersRouter)
app.use('/api/events', eventsRouter)

// Middlewares control de errores
// app.use(notFound)
// app.use(handleErrors)
/* Cuando se usa un next() sin parametro error entra en el middleware notfound.
Eso quiere decir que no ha hecho match con ningun controlador y no ha habido error en ellas.
Cuando entra en el handleErrors es pq se ha hecho un next desde alguno de los controladores y se le ha pasado
el error como parametro */

module.exports = app
