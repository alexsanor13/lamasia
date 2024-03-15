import { useEffect, useState } from 'react'
import MinusSVG from '../assets/svg/minus.svg?react'
import PlusSVG from '../assets/svg/plus.svg?react'

import './TicketSelector.css'

const TicketSelector = ({
	label,
	price,
	max,
	selection,
	notBuyable = false,
	releaseStatus = 'Proximamente',
}) => {
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
		<div className={!notBuyable ? 'ticket-selector' : 'release-info'}>
			<span className={!notBuyable ? 'ticket-label' : 'release-label'}>
				{label}
			</span>
			<span className={!notBuyable ? 'ticket-selector-price' : 'release-price'}>
				{price}
			</span>
			{!notBuyable ? (
				<div className="counter">
					<button onClick={handleMinusClick} className="button-minus">
						<MinusSVG className="minus-svg" />
					</button>
					<span className="value">{value}</span>
					<button onClick={handlePlusClick} className="button-plus">
						<PlusSVG className="plus-svg" />
					</button>
				</div>
			) : (
				<span className="release-status">{releaseStatus}</span>
			)}
		</div>
	)
}

export default TicketSelector
