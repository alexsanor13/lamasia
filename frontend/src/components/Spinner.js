import './Spinner.css'
import Skull from '../assets/skull.png'

const Spinner = () => {
	return (
		<div className="spinner-container">
			<img className="skull-loader" src={Skull} alt="Loader"></img>
		</div>
	)
}

export default Spinner
