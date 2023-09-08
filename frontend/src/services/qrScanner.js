import axios from 'axios'
// Como el frontend se ha incluido en el deploy del backend y se encuentran en el mismo dominio, podemos utilizar path relativo
import baseUrl from './baseUrl'

const url = baseUrl + '/scanner'

const createQR = async (transactionId) => {
	// console.log('Validation in progress...')
	// const
	// try {
	// 	const response = await axios.post(url + , {
	// 		encryptedQR,
	// 	})
	// 	return response.data
	// } catch (error) {
	// 	console.error(error)
	// 	return null
	// }
}

const scanQR = async (encryptedQR) => {
	url += '/scanQR'

	try {
		const response = await axios.post(url, {
			encryptedQR,
		})

		return response.data
	} catch (error) {
		console.error(error)
		return null
	}
}

const exports = { createQR, scanQR }

export default exports
