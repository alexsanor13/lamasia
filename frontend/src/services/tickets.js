import axios from 'axios'
// Como el frontend se ha incluido en el deploy del backend y se encuentran en el mismo dominio, podemos utilizar path relativo
import baseUrl from './baseUrl'

const url = baseUrl + '/tickets'

const buyTickets = async (purchaseDetails) => {
	console.log('Process purchase')
	try {
		const response = await axios.post(url, purchaseDetails)

		return response.data
	} catch (error) {
		console.error(error)
		return null
	}
}

const exports = { buyTickets }

export default exports
