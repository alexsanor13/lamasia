import axios from 'axios'
import utils from '../common/utils.js'
const { showResponseErrors, baseUrl } = utils

const url = `${baseUrl}/tickets`

const getRedsysRedirection = async (purchaseDetails) => {
	try {
		const params = await axios.post(`${url}/getRedirection`, purchaseDetails)
		return params.data
	} catch (error) {
		showResponseErrors(error)
		return null
	}
}

const buyTickets = async (purchaseDetails) => {
	try {
		const paymentResponse = await axios.post(
			`${url}/processPayment`,
			purchaseDetails
		)
		return paymentResponse.data
	} catch (error) {
		showResponseErrors(error)
		return null
	}
}

const exports = { buyTickets, getRedsysRedirection }

export default exports
