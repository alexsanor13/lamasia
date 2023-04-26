import React from 'react'
import Event from './Event'
import './EventsCollection.css'

import fuckCovid from '../assets/images/fuckCovid.webp'
import fuckCovidPlaceholder from '../assets/placeholders/fuckCovid-placeholder.svg'
import aFuego from '../assets/images/aFuego.webp'
import aFuegoPlaceholder from '../assets/placeholders/aFuego-placeholder.svg'
import revolution from '../assets/images/revolution.webp'
import revolutionPlaceholder from '../assets/placeholders/revolution-placeholder.svg'
import pecados from '../assets/images/pecados.webp'
import pecadosPlaceholder from '../assets/placeholders/pecados-placeholder.svg'

const EventsCollection = () => {
	const events = [
		{
			title: 'NewEvent',
			date: '01-07-2023',
			image: pecados,
			placeholder: pecadosPlaceholder,
		},
		{
			title: 'F☠️CK COVID',
			date: '02-04-2022',
			image: fuckCovid,
			placeholder: fuckCovidPlaceholder,
		},
		{
			title: 'A FUEG🔥',
			date: '02-07-2022',
			image: aFuego,
			placeholder: aFuegoPlaceholder,
		},
		{
			title: 'R3VOLUTION',
			date: '02-09-2022',
			image: revolution,
			placeholder: revolutionPlaceholder,
		},
		{
			title: 'TOR7UGA',
			date: '02-12-2022',
			image: pecados,
			placeholder: pecadosPlaceholder,
		},
	]

	return (
		<div className="events-collection">
			{events.map((item, index) => (
				<Event key={index} event={item} />
			))}
		</div>
	)
}

export default EventsCollection
