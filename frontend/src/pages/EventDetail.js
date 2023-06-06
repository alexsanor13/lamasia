import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import TicketSelector from '../components/TicketSelector.js'
import EmailModal from '../components/EmailModal.js'

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
						<div className="event-detail-image-container">
							<img
								src={eventInfo.image}
								alt={eventInfo.title}
								className="event-detail-image"
							/>
						</div>
						<div className="event-detail-info">
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
								<p>{eventInfo.date}</p>
							</div>
							<div className="event-location box">
								<div className="location-info">
									<div className="box-title-container">
										<h2 className="box-title">DÓNDE</h2>
									</div>
									<p>{eventInfo.location}</p>
									<p>{eventInfo.locationInfo}</p>
								</div>
							</div>
						</div>
					</div>
				</section>
			)}
		</div>
	)
}

export default EventDetail
