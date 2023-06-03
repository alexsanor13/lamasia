import soon from '../assets/gifs/soon.gif'
import './Soon.css'

const Soon = () => {
	return (
		<section>
			<div className="soon-container">
				<span>proximamente...</span>
				<img src={soon} alt="Soon." />
			</div>
		</section>
	)
}

export default Soon
