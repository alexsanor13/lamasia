const isDev = process.env.REACT_APP_MODE === 'dev'

let baseUrl = '/api'
if (isDev) {
	baseUrl = 'http://localhost:3001' + baseUrl
}

export default baseUrl
