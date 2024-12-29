import React from 'react'
import { Link } from 'react-router-dom'
import './EventBox.css'
import utils from '../common/utils'

import { LazyLoadImage } from 'react-lazy-load-image-component'

const EventBox = ({ event }) => {
	const { title, date, image } = event

	const isUpcomingEvent = () => new Date(date) > new Date()

	const showBuyTickets = isUpcomingEvent() ? (
		<Link
			aria-label="Comprar entrada"
			to={`/events/${event.id}`}
			id={`events-page-${event.id}`}>
			<button className="buy-button">COMPRAR ENTRADA</button>
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

	const placeholder = '../assets/placeholders/fuckCovid.svg'

	const handleLoadImage = () => {
		const container = document.getElementById(`${title}-container`)
		container.style.minHeight = '0'
	}

	return (
		<div className={eventClass.containerClass}>
			<div className="event-image-container" id={`${title}-container`}>
				<LazyLoadImage
					src={image}
					placeholderSrc={placeholder}
					alt={title}
					effect="blur"
					className="event-image"
					onLoad={() => handleLoadImage()}
				/>
			</div>
			<div className="event-info-container outlined-text">
				<p className={eventClass.dateClass}>{utils.getDDMMYYYDate(date)}</p>
				<h2 className="event-title">{title}</h2>
				{showBuyTickets}
			</div>
		</div>
	)
}

export default EventBox
