import axios from 'axios'
// Como el frontend se ha incluido en el deploy del backend y se encuentran en el mismo dominio, podemos utilizar path relativo
import baseUrl from './baseUrl'

let url = baseUrl + '/scanner'

const scanQR = async (encryptedQR) => {
	try {
		const response = await axios.post(`${url}/scanQR`, {
			encryptedQR,
		})

		return response.data
	} catch (error) {
		console.error(error)
		return null
	}
}

const exports = { scanQR }

export default exports