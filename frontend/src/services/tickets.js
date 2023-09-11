import axios from 'axios'
// Como el frontend se ha incluido en el deploy del backend y se encuentran en el mismo dominio, podemos utilizar path relativo
import baseUrl from './baseUrl'

const url = baseUrl + '/tickets'
const redsysUrl = 'https://sis-t.redsys.es:25443/sis/realizarPago'

const buyTickets = async (purchaseDetails) => {
	console.log('Purchase in process')
	try {
		const creation = await axios.post(`${url}/createPayment`, purchaseDetails)
		// TODO SABER COMO REDIRECCIONAR AL USUARIO AL PAGO PARA IMTRPDUCIR DATOS DE LA TARJETA
		const tpvResponse = await axios.post(redsysUrl, creation.data)
		const paymentResponse = await axios.post(
			`${url}/processPayment`,
			tpvResponse
		)
		return paymentResponse.data
	} catch (error) {
		console.error(error)
		return null
	}
}

const exports = { buyTickets }

export default exports
