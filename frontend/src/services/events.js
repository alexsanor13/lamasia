import axios from 'axios'
import utils from '../common/utils.js'
const { showResponseErrors, baseUrl } = utils

const url = baseUrl + '/events'

const getAllEvents = async () => {
	console.log('Getting events')
	const response = await axios.get(url)
	return response.data
}

const getEventInfo = async (eventId) => {
	try {
		console.log('Getting event ${eventId} info')

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
