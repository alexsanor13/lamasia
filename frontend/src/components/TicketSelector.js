import { useEffect, useState } from 'react'
import './TicketSelector.css'

const TicketSelector = ({ label, price, max, selection }) => {
	const [value, setValue] = useState(0)

	useEffect(() => {
		selection(value)
	}, [value, selection])

	const handleMinusClick = () => {
		if (value > 0) {
			setValue(value - 1)
		}
	}

	const handlePlusClick = () => {
		if (value < max) {
			setValue(value + 1)
		}
	}

	return (
		<div className="ticket-selector">
			<span className="ticket-label">{label}</span>
			<span className="ticket-selector-price">{price}</span>
			<div className="counter">
				<button onClick={handleMinusClick} className="button-minus">
					<svg className="minus-svg" viewBox="0 0 448 512">
						<path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
					</svg>
				</button>
				<span className="value">{value}</span>
				<button onClick={handlePlusClick} className="button-plus">
					<svg className="plus-svg" viewBox="0 0 448 512">
						<path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
					</svg>
				</button>
			</div>
		</div>
	)
}

export default TicketSelector
