import axios from 'axios'
//const baseUrl = 'https://safe-eyrie-72931.herokuapp.com/api/notes'
// Como el frontend se ha incluido en el deploy del backend y se encuentran en el mismo dominio, podemos utilizar path relativo
const baseUrl = 'http://localhost:3001/api/events'

const getAllEvents = async () => {
	const response = await axios.get(baseUrl)
	console.log(typeof response.data)
	return response.data
}

const exports = { getAllEvents }

export default exports
