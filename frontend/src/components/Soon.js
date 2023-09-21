import React from 'react'
import soon from '../assets/gifs/soon.gif'
import './Soon.css'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import placeholder from '../assets/placeholders/fuckCovid.svg'

const Soon = () => {
	return (
		<section>
			<div className="soon-container">
				<span>soon...</span>
				<LazyLoadImage
					src={soon}
					placeholderSrc={placeholder}
					alt="Soon."
					effect="blur"
				/>
			</div>
		</section>
	)
}

export default Soon
