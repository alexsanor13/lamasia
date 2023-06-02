import React, { useEffect } from 'react'
import EventBox from './EventBox'
import eventsServices from '../services/events.js'
import './EventsCollection.css'

const EventsCollection = ({ events, setEvents }) => {
	useEffect(() => {
		eventsServices.getAllEvents().then((fetchedEvents) => {
			setEvents(fetchedEvents)
		})
	}, [setEvents])

	return (
		<>
			{events.length > 0 && (
				<div className="events-collection">
					{events.map((item) => (
						<EventBox key={item.id} event={item} />
					))}
				</div>
			)}
		</>
	)
}

export default EventsCollection
