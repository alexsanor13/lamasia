import axios from 'axios'
import utils from '../common/utils.js'
const { showResponseErrors, baseUrl } = utils

const url = baseUrl + '/scanner'

const scanQR = async (encryptedQR) => {
	try {
		const response = await axios.post(`${url}/scanQR`, {
			encryptedQR,
		})

		return response.data
	} catch (error) {
		showResponseErrors(error)
		return null
	}
}

const exports = { scanQR }

export default exports
