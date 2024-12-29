import axios from 'axios'
import utils from '../common/utils.js'
const { showResponseErrors, baseUrl } = utils

const url = `${baseUrl}/events`

const getAllEvents = async () => {
	try {
		const response = await axios.get(url)
		return response.data
	} catch (error) {
		showResponseErrors(error)
		return null
	}
}

const getEventInfo = async (eventId) => {
	try {
		const response = await axios.post(url, {
			id: eventId,
		})

		return response.data
	} catch (error) {
		showResponseErrors(error)
		return null
	}
}

const exports = { getAllEvents, getEventInfo }

export default exports
