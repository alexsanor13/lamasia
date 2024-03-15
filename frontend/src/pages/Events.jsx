import React, { useState, useEffect } from 'react'
import EventsCollection from '../components/EventsCollection'
import Spinner from '../components/Spinner'
import eventsServices from '../services/events'

import './Events.css'

const Events = () => {
	const [events, setEvents] = useState([])
	const [loading, setLoading] = useState(true)
	const [dataLoaded, setDataLoaded] = useState(false)

	useEffect(() => {
		document.title = 'La Masia - Eventos'
		const metaDescriptionTag = document.querySelector(
			'meta[name="description"]'
		)
		if (metaDescriptionTag) {
			metaDescriptionTag.setAttribute(
				'content',
				'El lugar favorito de Jacky 🏴‍☠️🐒. ¡Compra ya tus entradas!'
			)
		}

		window.scrollTo(0, 0)

		if (!dataLoaded) {
			eventsServices.getAllEvents().then((fetchedEvents) => {
				setEvents(fetchedEvents ?? [])
				setDataLoaded(true)
				setLoading(fetchedEvents === null)
			})
		} else {
			setLoading(false)
		}
	}, [dataLoaded])

	const sectionTitle = <h1 className="section-title">EVENTS</h1>

	return (
		<div className="center">
			{loading ? (
				<Spinner />
			) : (
				<section className="events">
					{sectionTitle}
					<EventsCollection events={events} />
				</section>
			)}
		</div>
	)
}

export default Events
