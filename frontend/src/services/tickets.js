import axios from 'axios'
//const baseUrl = 'https://safe-eyrie-72931.herokuapp.com/api/notes'
// Como el frontend se ha incluido en el deploy del backend y se encuentran en el mismo dominio, podemos utilizar path relativo
const baseUrl = '/api/tickets'

const buyTickets = async (purchaseDetails) => {
	console.log('Process purchase')
	try {
		const response = await axios.post(baseUrl, purchaseDetails)

		return response.data
	} catch (error) {
		console.error(error)
		return null
	}
}

const exports = { buyTickets }

export default exports
