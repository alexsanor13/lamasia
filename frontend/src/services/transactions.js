import axios from 'axios'
import baseUrl from './baseUrl'

const url = baseUrl + '/transactions'

const getPaymentInfoByOrderId = async (orderId) => {
	try {
		const response = await axios.post(`${url}/getPaymentInfo`, {
			orderId: orderId,
		})

		return response.data
	} catch (error) {
		console.error(error)
		return null
	}
}

const exports = { getPaymentInfoByOrderId }

export default exports
