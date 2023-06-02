import { useState, useEffect } from 'react'
import EventsCollection from '../components/EventsCollection'
import './Events.css'

const Events = ({ handlePage }) => {
	const [events, setEvents] = useState([])

	useEffect(() => {
		setEvents(events)
	}, [events])

	const sectionTitle = events.length ? (
		<h1 className="section-title">EVENTOS</h1>
	) : (
		''
	)
	console.log('Events rendered')
	return (
		<section className="events">
			{sectionTitle}
			<EventsCollection events={events} setEvents={setEvents} />
		</section>
	)
}

export default Events
