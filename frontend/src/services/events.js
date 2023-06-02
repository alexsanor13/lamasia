import axios from 'axios'
//const baseUrl = 'https://safe-eyrie-72931.herokuapp.com/api/notes'
// Como el frontend se ha incluido en el deploy del backend y se encuentran en el mismo dominio, podemos utilizar path relativo
const baseUrl = 'http://localhost:3001/api/events'

const getAllEvents = async () => {
	console.log('Getting events')
	const response = await axios.get(baseUrl)
	return response.data
}

const getEventInfo = async (eventId) => {
	try {
		const response = await axios.post(baseUrl, {
			id: eventId, // envía el ID del evento en el cuerpo de la solicitud
		})

		return response.data
	} catch (error) {
		console.error(error)
		return null
	}
}

const exports = { getAllEvents, getEventInfo }

export default exports
