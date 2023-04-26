import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import './Event.css'

const Event = ({ event }) => {
	const { title, date, image, placeholder } = event

	const getValidDate = () => {
		const [day, month, year] = date.split('-')
		return new Date(year, month - 1, day)
	}

	const isUpcomingEvent = () => {
		const eventFinished = getValidDate() < new Date()
		if (eventFinished) {
			return false
		}
		return true
	}

	const getFormattedDate = () => {
		const eventDate = getValidDate()

		const formattedDate = eventDate.toLocaleDateString('es-ES', {
			day: 'numeric',
			month: 'numeric',
			year: 'numeric',
		})
		return formattedDate
	}

	const showBuyTickets = isUpcomingEvent() ? (
		<button className="buy-ticket-button">Comprar entrada</button>
	) : (
		<button className="finished-button">Evento finalizado</button>
	)

	const eventStyle = isUpcomingEvent()
		? { minHeight: '600px', minWidth: '50%', backgroundColor: '#FDDA24' }
		: {}

	return (
		<div className="event-box" style={eventStyle}>
			<div className="event-image-container">
				<LazyLoadImage
					src={image}
					placeholderSrc={placeholder}
					alt={title}
					effect="blur"
					className="event-image"
				/>
			</div>
			<div className="event-info-container">
				<p className="event-date">{getFormattedDate()}</p>
				<h2 className="event-title">{title}</h2>
				{showBuyTickets}
			</div>
		</div>
	)
}

export default Event
