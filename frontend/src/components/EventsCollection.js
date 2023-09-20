import React from 'react'
import EventBox from './EventBox'
import './EventsCollection.css'

const EventsCollection = ({ events }) => {
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
