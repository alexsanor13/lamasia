import axios from 'axios'
import utils from '../common/utils.js'
const { showResponseErrors, baseUrl } = utils

const url = baseUrl + '/transactions'

const getPaymentInfoByOrderId = async (orderId) => {
	try {
		const response = await axios.post(`${url}/getPaymentInfo`, {
			orderId: orderId,
		})

		return response.data
	} catch (error) {
		showResponseErrors(error)
		return {}
	}
}

const exports = { getPaymentInfoByOrderId }

export default exports
