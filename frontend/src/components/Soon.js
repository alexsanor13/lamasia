import React, { useState } from 'react'
import Spinner from './Spinner'
import soon from '../assets/gifs/soon.gif'
import './Soon.css'

const Soon = () => {
	const [loading, setLoading] = useState(true)

	const handleImageLoaded = () => {
		setLoading(false)
	}

	return (
		<section>
			<div className="soon-container">
				<span>soon...</span>
				{loading ? (
					<Spinner />
				) : (
					<img
						src={soon}
						alt="Soon."
						onLoad={handleImageLoaded}
						style={{ display: loading ? 'none' : 'block' }}
					/>
				)}
			</div>
		</section>
	)
}

export default Soon
