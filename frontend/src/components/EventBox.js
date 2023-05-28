import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import './EventBox.css'

const EventBox = ({ event }) => {
	const { title, date, image, placeholder } = event

	const getValidDate = () => {
		const [day, month, year] = date.split('/')
		return new Date(year, month - 1, day)
	}

	const isUpcomingEvent = () => {
		const eventFinished = getValidDate() < new Date()
		if (eventFinished) {
			return false
		}
		return true
	}

	const showBuyTickets = isUpcomingEvent() ? (
		<button className="buy-ticket-button">COMPRAR ENTRADA</button>
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
				<LazyLoadImage
					src={image}
					placeholderSrc={placeholder}
					alt={title}
					effect="blur"
					className="event-image"
				/>
			</div>
			<div className="event-info-container outlined-text">
				<p className={eventClass.dateClass}>{date}</p>
				<h2 className="event-title">{title}</h2>
				{showBuyTickets}
			</div>
		</div>
	)
}

export default EventBox
