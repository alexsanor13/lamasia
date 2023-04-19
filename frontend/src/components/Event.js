import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import './Event.css'

const Event = ({ event }) => {
	const { title, date, image, placeholder } = event
	return (
		<div className="event-box">
			<div className="event-image-container">
				<LazyLoadImage
					src={image}
					placeholderSrc={placeholder}
					alt={title}
					effect="blur"
					className="event-image"
				/>
			</div>
			<div className="event-info-container">
				<h2 className="event-title">{title}</h2>
				<p className="event-date">{date}</p>
				<p className="event-description">{}</p>
				<button className="buy-ticket-button">Comprar entrada</button>
			</div>
		</div>
	)
}

export default Event
