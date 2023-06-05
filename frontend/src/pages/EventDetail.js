import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import TicketSelector from '../components/TicketSelector.js'
import EmailModal from '../components/EmailModal.js'

import eventsServices from '../services/events.js'
import './EventDetail.css'

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

	if (loading) {
		return <></>
	}

	const handlePurchase = () => {
		const amount =
			packTickets * eventInfo.extraPrice + selectedTickets * eventInfo.price

		if (amount) {
			setCart({
				tickets: selectedTickets,
				price: eventInfo.price,
				packTickets: packTickets,
				packPrice: eventInfo.extraPrice,
				amount,
			})

			openModal()
		}
	}

	return (
		<div className="event-detail-container">
			<span className="event-detail-title outlined-text">
				{eventInfo.title}
			</span>
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
						<h2 className="box-title">ENTRADAS</h2>
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
							price={`${eventInfo.extraPrice ? eventInfo.extraPrice : 100}€`}
							max={1}
							selection={setPackTickets}
						/>
						<div className="button-container">
							<button
								onClick={handlePurchase}
								className="event-detail-purchase-button">
								Confirmar compra
							</button>
							<EmailModal
								isOpen={modalIsOpen}
								closeModal={closeModal}
								shoppingCart={cart}
							/>
						</div>
					</div>
					<div className="event-description box">
						<h2 className="box-title">QUÉ</h2>
						<p>{eventInfo.description}</p>
					</div>
					<div className="event-time box">
						<h2 className="box-title">CUÁNDO</h2>
						<p>{eventInfo.date}</p>
					</div>
					<div className="event-location box">
						<div className="location-info">
							<h2 className="box-title">DÓNDE</h2>
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
