import '@styles/spinner.css'
import { ReactComponent as SkullSVG } from '@assets/svg/skull.svg'

const Spinner = () => {
	return (
		<div className="spinner-container">
			<SkullSVG className="skull-loader" />
		</div>
	)
}

export default Spinner
