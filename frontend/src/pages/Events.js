import React, { useState, useEffect } from 'react'
import EventsCollection from '../components/EventsCollection'
import Spinner from '../components/Spinner'
import eventsServices from '../services/events'

import './Events.css'

const Events = () => {
	const [events, setEvents] = useState([])
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		document.title = 'La Masia - Eventos'
		window.scrollTo(0, 0)
		setLoading(true)
		eventsServices.getAllEvents().then((fetchedEvents) => {
			setEvents(fetchedEvents)
			setLoading(false)
		})
	}, [])

	const sectionTitle = events.length ? (
		<h1 className="section-title">EVENTOS</h1>
	) : (
		''
	)

	return (
		<div className="center">
			{loading ? (
				<Spinner />
			) : (
				<section className="events">
					{sectionTitle}
					<EventsCollection events={events} setEvents={setEvents} />
				</section>
			)}
		</div>
	)
}

export default Events
