const getDDMMYYYDate = (dateString) => {
	const receivedDate = new Date(dateString)
	let day = String(receivedDate.getDate()).padStart(2, '0')
	let month = String(receivedDate.getMonth() + 1).padStart(2, '0')
	let year = receivedDate.getFullYear()

	return `${day}/${month}/${year}`
}

const getFormattedDate = (dateString) => {
	const receivedDate = new Date(dateString)
	let day = String(receivedDate.getDate()).padStart(2, '0')
	let month = receivedDate.toLocaleString('es-ES', { month: 'long' })
	let year = receivedDate.getFullYear()

	return `${day} de ${month} de ${year}`
}

const exportUtils = { getDDMMYYYDate, getFormattedDate }
export default exportUtils
