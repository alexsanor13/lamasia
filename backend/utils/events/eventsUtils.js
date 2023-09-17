const getTicketsAlreadySold = async (eventId) => {
	const Ticket = require('../../models/Ticket')
	const soldTickets = await Ticket.find({ eventId: eventId })
	return soldTickets.length
}

const getPrice = async (event, isPack = false) => {
	try {
		const soldTickets = await getTicketsAlreadySold(event.id)

		if (isPack) {
			return { price: event.priceVIP, release: 10, priceLabel: 'VIP' }
		}

		if (soldTickets < event.release1) {
			return { price: event.price1, release: 1, priceLabel: 'Primera Release' }
		} else if (soldTickets >= event.release1 && soldTickets < event.release2) {
			return { price: event.price2, release: 2, priceLabel: 'Segunda Release' }
		} else {
			return {
				price: event.priceFinal,
				release: 3,
				priceLabel: 'Release Final',
			}
		}
	} catch (e) {
		throwErrors('Error calculating price')
	}
}

module.exports = {
	getPrice,
	getTicketsAlreadySold,
}
