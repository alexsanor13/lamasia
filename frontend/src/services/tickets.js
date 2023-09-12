import axios from 'axios'
// Como el frontend se ha incluido en el deploy del backend y se encuentran en el mismo dominio, podemos utilizar path relativo
import baseUrl from './baseUrl'

const url = baseUrl + '/tickets'

const getRedsysRedirection = async (purchaseDetails) => {
	try {
		const params = await axios.post(`${url}/getRedirection`, purchaseDetails)
		return params.data
	} catch (error) {
		console.error(error)
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
		console.error(error)
		return null
	}
}

const exports = { buyTickets, getRedsysRedirection }

export default exports
