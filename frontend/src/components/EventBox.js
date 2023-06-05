import React from 'react'
import { Link } from 'react-router-dom'
import './EventBox.css'

const EventBox = ({ event }) => {
	const { title, date, image } = event

	const getFormattedDate = () => {
		const receivedDate = new Date(date)
		let day = String(receivedDate.getDate()).padStart(2, '0')
		let month = String(receivedDate.getMonth() + 1).padStart(2, '0')
		let year = receivedDate.getFullYear()

		return `${day}/${month}/${year}`
	}

	const isUpcomingEvent = () => {
		const eventFinished = new Date(date) < new Date()
		if (eventFinished) {
			return false
		}
		return true
	}

	const showBuyTickets = isUpcomingEvent() ? (
		<Link to={`/events/${event.id}`} id="events-page">
			<button className="buy-ticket-button">COMPRAR ENTRADA</button>
		</Link>
	) : (
		<button className="finished-button">EVENTO FINALIZADO</button>
	)

	const eventClass = isUpcomingEvent()
		? {
				containerClass: 'event-box event-box-upcoming',
				dateClass: 'event-date event-date-upcoming',
		  }
		: { containerClass: 'event-box', dateClass: 'event-date' }

	return (
		<div className={eventClass.containerClass}>
			<div className="event-image-container">
				<img src={image} alt={title} className="event-image" />
			</div>
			<div className="event-info-container outlined-text">
				<p className={eventClass.dateClass}>{getFormattedDate()}</p>
				<h2 className="event-title">{title}</h2>
				{showBuyTickets}
			</div>
		</div>
	)
}

export default EventBox
