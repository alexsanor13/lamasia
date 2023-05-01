import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import './Event.css'

const Event = ({ event }) => {
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

	const eventClassName = isUpcomingEvent()
		? 'event-box event-box-upcoming'
		: 'event-box'

	const dateClassName = isUpcomingEvent()
		? 'event-date event-date-upcoming'
		: 'event-date'

	return (
		<div className={eventClassName}>
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
				<p className={dateClassName}>{date}</p>
				<h2 className="event-title">{title}</h2>
				{showBuyTickets}
			</div>
		</div>
	)
}

export default Event
