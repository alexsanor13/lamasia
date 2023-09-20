import React from 'react'
import { Link } from 'react-router-dom'
import './EventBox.css'
import utils from '../common/utils'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import aFuegoSVG from '../assets/placeholders/aFuego.svg'
import fuckCovidSVG from '../assets/placeholders/fuckCovid.svg'
import genesisSVG from '../assets/placeholders/genesis.svg'
import pandoraSVG from '../assets/placeholders/pandora.svg'
import pecadosSVG from '../assets/placeholders/pecados.svg'
import revolutionSVG from '../assets/placeholders/revolution.svg'

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

	const placeholder = (title) => {
		switch (title) {
			case 'PANDORA':
				return pandoraSVG
			case 'GÉNESIS':
				return genesisSVG
			case 'TOR7UGA':
				return pecadosSVG
			case 'R3VOLUTION':
				return revolutionSVG
			case 'A FUEG🔥':
				return aFuegoSVG
			case 'F☠️CK COVID':
				return fuckCovidSVG
			default:
				return fuckCovidSVG
		}
	}

	return (
		<div className={eventClass.containerClass}>
			<div className="event-image-container">
				{/* <img src={image} alt={title} className="event-image" /> */}
				<LazyLoadImage
					src={image}
					placeholderSrc={placeholder()}
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
