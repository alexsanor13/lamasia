import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import TicketSelector from '../components/TicketSelector'
import EmailModal from '../components/EmailModal'
import utils from '../common/utils'

import PinSVG from '../assets/svg/pin.svg?react'
import ClockSVG from '../assets/svg/clock.svg?react'
import CalendarSVG from '../assets/svg/calendar.svg?react'

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
		const handleResize = () => {
			setIsMobile(window.innerWidth < 768)
		}

		window.scrollTo(0, 0)

		window.addEventListener('resize', handleResize)

		eventsServices.getEventInfo(id).then((fetchedEvent) => {
			setEventInfo(fetchedEvent)
			document.title = `La Masia - ${fetchedEvent.title}`
			setLoading(false)
		})

		if (isMobile) {
			document.documentElement.style.background = 'black'
		}

		return () => {
			window.removeEventListener('resize', handleResize)
			document.documentElement.style.background = null
		}
	}, [id, isMobile])

	const handlePurchase = () => {
		const amount =
			packTickets * eventInfo.priceVIP ||
			Number(selectedTickets) * eventInfo.price

		if (amount) {
			setCart({
				eventId: id,
				tickets: selectedTickets,
				price: eventInfo.price,
				packTickets: packTickets,
				packPrice: eventInfo?.priceVIP,
				amount,
			})

			openModal()
		} else {
			alert('Selecciona una entrada para continuar.')
		}
	}

	const getTicketSelectorInfo = (release) => {
		let notBuyable = false
		let releaseStatus = ''
		if (release.price === eventInfo.price) {
			return { notBuyable, releaseStatus }
		}

		notBuyable = true
		const total = eventInfo.releases.length
		if (release === eventInfo.releases[total - 1]) {
			releaseStatus = 'Taquilla'
		} else {
			releaseStatus =
				release.price > eventInfo.price ? 'Proximamente' : 'Agotado'
		}
		return { notBuyable, releaseStatus }
	}

	const ticketsContainer = eventInfo?.price && (
		<div className="event-detail-purchase box">
			<div className="box-title-container">
				<h2 className="box-title">ENTRADAS</h2>
			</div>
			<div className="event-ticket-container">
				{eventInfo.releases.map((release) => {
					const { notBuyable, releaseStatus } = getTicketSelectorInfo(release)
					return (
						<TicketSelector
							key={release.price}
							className="event-ticket-option"
							label={release.label}
							price={`${release.price}€`}
							max={7}
							selection={setSelectedTickets}
							notBuyable={notBuyable}
							releaseStatus={releaseStatus}
						/>
					)
				})}

				{eventInfo.priceVIP && (
					<TicketSelector
						className="event-ticket-option"
						label={'Mesa con botella y shisha (5 personas)'}
						price={`${eventInfo.priceVIP}€`}
						max={1}
						selection={setPackTickets}
					/>
				)}
			</div>

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
							{ticketsContainer}
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
									<CalendarSVG className="info-svg" />
									<span className="date-calendar-info ">
										<b>{utils.getFormattedDate(eventInfo.date)}</b>
									</span>
								</div>
								<div className="date-schedule">
									<ClockSVG className="info-svg" />
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
									<PinSVG className="info-svg" />
									<span className="location-description">
										<b>
											{eventInfo.locationDescription} - {eventInfo.location}
										</b>
									</span>
								</div>
								{eventInfo.locationMap && (
									<iframe
										src={eventInfo.locationMap}
										allowFullScreen=""
										className="location-map"
										title={eventInfo.locationDescription}
										loading="lazy"
									/>
								)}
							</div>
						</div>
					</div>
				</section>
			)}
		</div>
	)
}

export default EventDetail
