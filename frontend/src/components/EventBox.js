import React from 'react'
import { Link } from 'react-router-dom'
import './EventBox.css'
import utils from '../common/utils'

import { LazyLoadImage } from 'react-lazy-load-image-component'
import fuckCovidSVG from '../assets/placeholders/fuckCovid.svg'
import aFuegoSVG from '../assets/placeholders/aFuego.svg'
import genesisSVG from '../assets/placeholders/genesis.svg'
import pandoraSVG from '../assets/placeholders/pandora.svg'
import pecadosSVG from '../assets/placeholders/pecados.svg'
import revolutionSVG from '../assets/placeholders/revolution.svg'

const placeholderDictionary = {
	PANDORA: pandoraSVG,
	GÉNESIS: genesisSVG,
	TOR7UGA: pecadosSVG,
	R3VOLUTION: revolutionSVG,
	'A FUEG🔥': aFuegoSVG,
	'F☠️CK COVID': fuckCovidSVG,
	default: fuckCovidSVG,
}

const EventBox = ({ event }) => {
	const { title, date, image } = event

	const isUpcomingEvent = () => {
		const eventFinished = new Date(date) < new Date()
		if (eventFinished) {
			return false
		}
		return true
	}

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

	return (
		<div className={eventClass.containerClass}>
			<div className="event-image-container">
				{/* <img src={image} alt={title} className="event-image" /> */}
				<LazyLoadImage
					src={image}
					placeholderSrc={() =>
						placeholderDictionary[title] || placeholderDictionary['default']
					}
					alt={title}
					effect="blur"
					className="event-image"
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
