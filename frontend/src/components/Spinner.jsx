import './Spinner.css'
import SkullSVG from '../assets/svg/skull.svg?react'

const Spinner = () => {
	return (
		<div className="spinner-container">
			<SkullSVG className="skull-loader" />
		</div>
	)
}

export default Spinner
