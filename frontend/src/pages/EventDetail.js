import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import TicketSelector from '../components/TicketSelector.js'
import EmailModal from '../components/EmailModal.js'
import utils from '../common/utils'

import eventsServices from '../services/events.js'
import './EventDetail.css'
import Spinner from '../components/Spinner'

const EventDetail = () => {
	const { id } = useParams()
	const [eventInfo, setEventInfo] = useState(null)
	const [loading, setLoading] = useState(true)
	const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
	const [selectedTickets, setSelectedTickets] = useState(0)
	const [packTickets, setPackTickets] = useState(0)
	const [cart, setCart] = useState({})

	const [modalIsOpen, setIsOpen] = useState(false)

	function openModal() {
		document.querySelector('header').style.display = 'none'
		setIsOpen(true)
	}

	function closeModal() {
		document.querySelector('header').style.display = 'flex'
		setIsOpen(false)
	}

	useEffect(() => {
		document.title = eventInfo ? `La Masia - ${eventInfo.title}` : ''
	}, [eventInfo])

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 768)
		}

		window.scrollTo(0, 0)

		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	useEffect(() => {
		if (isMobile) {
			document.documentElement.style.background = 'black'
		}

		return () => {
			document.documentElement.style.background = null
		}
	}, [isMobile])

	useEffect(() => {
		eventsServices.getEventInfo(id).then((fetchedEvent) => {
			setEventInfo(fetchedEvent)
			setLoading(false)
		})
	}, [id])

	const handlePurchase = () => {
		const amount =
			packTickets * eventInfo.extraPrice + selectedTickets * eventInfo.price

		if (amount) {
			setCart({
				eventId: id,
				tickets: selectedTickets,
				price: eventInfo.price,
				packTickets: packTickets,
				packPrice: eventInfo.extraPrice,
				amount,
			})

			openModal()
		} else {
			alert('Selecciona una entrada para continuar.')
		}
	}

	const calendarSvg = (
		<svg className="info-svg" viewBox="0 0 448 512">
			<path d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H336zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H208zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H336c-8.8 0-16 7.2-16 16z" />
		</svg>
	)

	const clockSvg = (
		<svg className="info-svg" viewBox="0 0 448 512">
			<path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
		</svg>
	)

	const pinSvg = (
		<svg className="info-svg" viewBox="0 0 448 512">
			<path d="M16 144a144 144 0 1 1 288 0A144 144 0 1 1 16 144zM160 80c8.8 0 16-7.2 16-16s-7.2-16-16-16c-53 0-96 43-96 96c0 8.8 7.2 16 16 16s16-7.2 16-16c0-35.3 28.7-64 64-64zM128 480V317.1c10.4 1.9 21.1 2.9 32 2.9s21.6-1 32-2.9V480c0 17.7-14.3 32-32 32s-32-14.3-32-32z" />
		</svg>
	)

	return (
		<div className="center">
			{loading ? (
				<Spinner />
			) : (
				<section className="event-detail-container">
					<h1 className="event-detail-title outlined-text">
						{eventInfo.title}
					</h1>
					<div className="event-detail-content">
						<div className="left-side">
							<div className="event-detail-image-container">
								<img
									src={eventInfo.image}
									alt={eventInfo.title}
									className="event-detail-image"
								/>
							</div>
							<div className="event-detail-purchase box">
								<div className="box-title-container">
									<h2 className="box-title">ENTRADAS</h2>
								</div>
								<TicketSelector
									className="event-ticket-option"
									label={'Entrada pirata'}
									price={`${eventInfo.price ? eventInfo.price : 12}€`}
									max={5}
									selection={setSelectedTickets}
								/>
								<TicketSelector
									className="event-ticket-option"
									label={'Mesa con botella y shisha (5 personas)'}
									price={`${
										eventInfo.extraPrice ? eventInfo.extraPrice : 100
									}€`}
									max={1}
									selection={setPackTickets}
								/>
								<div className="button-container">
									<button
										onClick={handlePurchase}
										className="event-detail-purchase-button buy-button">
										Continuar
									</button>
									<EmailModal
										isOpen={modalIsOpen}
										closeModal={closeModal}
										shoppingCart={cart}
									/>
								</div>
							</div>
						</div>
						<div className="event-detail-info">
							<div className="event-description box">
								<div className="box-title-container">
									<h2 className="box-title">QUÉ</h2>
								</div>
								<p>{eventInfo.description}</p>
							</div>
							<div className="event-time box">
								<div className="box-title-container">
									<h2 className="box-title">CUÁNDO</h2>
								</div>
								<div className="date-calendar">
									{calendarSvg}
									<span className="date-calendar-info ">
										<b>{utils.getFormattedDate(eventInfo.date)}</b>
									</span>
								</div>
								<div className="date-schedule">
									{clockSvg}
									<span className="date-calendar-info ">
										<b>{eventInfo.scheduleTime}</b>
									</span>
								</div>
							</div>
							<div className="event-location box">
								<div className="box-title-container">
									<h2 className="box-title">DÓNDE</h2>
								</div>
								<div className="location-info">
									{pinSvg}
									<span className="location-description">
										<b>{eventInfo.locationDescription}</b>
									</span>
									-
									<span className="location-info-text">
										<b>{eventInfo.location}</b>
									</span>
								</div>
								<iframe
									src={eventInfo.locationMap}
									allowFullScreen=""
									className="location-map"
									title={eventInfo.locationDescription}
									loading="lazy"
								/>
							</div>
						</div>
					</div>
				</section>
			)}
		</div>
	)
}

export default EventDetail
