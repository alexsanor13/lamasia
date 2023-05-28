import React, { useEffect } from 'react'
import EventBox from './EventBox'
import eventsServices from '../services/events.js'
import './EventsCollection.css'

import fuckCovidPlaceholder from '../assets/placeholders/fuckCovid-placeholder.svg'
import aFuegoPlaceholder from '../assets/placeholders/aFuego-placeholder.svg'
import revolutionPlaceholder from '../assets/placeholders/revolution-placeholder.svg'
import pecadosPlaceholder from '../assets/placeholders/pecados-placeholder.svg'

const EventsCollection = ({ events, setEvents }) => {
	useEffect(() => {
		eventsServices.getAllEvents().then((fetchedEvents) => {
			const placeholders = {
				fuckCovidPlaceholder,
				aFuegoPlaceholder,
				revolutionPlaceholder,
				pecadosPlaceholder,
			}

			fetchedEvents.forEach((event) => {
				event.placeholder = placeholders[event.placeholder]
			})

			setEvents(fetchedEvents)
		})
	}, [setEvents])

	console.log('Events collection rendered')

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
