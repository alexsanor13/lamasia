import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import eventsServices from '../services/events.js'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import { CircleLoader } from 'react-spinners'
import './EventDetail.css'

const EventDetail = () => {
	const { id } = useParams()
	const [eventInfo, setEventInfo] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		eventsServices.getEventInfo(id).then((fetchedEvent) => {
			setEventInfo(fetchedEvent)
			setLoading(false)
		})
	}, [id])

	if (loading) {
		return <></>
	}

	return (
		<div className="event-detail-container">
			<div className="event-detail-content">
				<div className="event-detail-image-container">
					<LazyLoadImage
						src={eventInfo.image}
						placeholderSrc={eventInfo.placeholder}
						alt={eventInfo.title}
						effect="blur"
						className="event-detail-image"
					/>
				</div>
				<div className="event-detail-info">
					<h1 className="event-title">{eventInfo.title}</h1>
					<div className="event-description">
						<h2>About the Event</h2>
						<p>{eventInfo.description}</p>
					</div>
					<div className="event-time">
						<h2>Event Date</h2>
						<p>{eventInfo.date}</p>
					</div>
					<div className="event-location">
						<i className="event-location-icon">📍</i>
						<div className="location-info">
							<h2 className="location-title">Location</h2>
							<p>{eventInfo.location}</p>
							<p>{eventInfo.locationInfo}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default EventDetail
