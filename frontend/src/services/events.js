import axios from 'axios'
//const baseUrl = 'https://safe-eyrie-72931.herokuapp.com/api/notes'
// Como el frontend se ha incluido en el deploy del backend y se encuentran en el mismo dominio, podemos utilizar path relativo
import baseUrl from './baseUrl'

const url = baseUrl + '/events'

const getAllEvents = async () => {
	const response = await axios.get(url)
	return response.data
}

const getEventInfo = async (eventId) => {
	try {
		const response = await axios.post(url, {
			id: eventId,
		})

		return response.data
	} catch (error) {
		console.error(error)
		return null
	}
}

const exports = { getAllEvents, getEventInfo }

export default exports
