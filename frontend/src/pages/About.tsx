import Soon from '../components/Soon'
import { useEffect } from 'react'

function About() {
	useEffect(() => {
		document.title = `La Masia - Sobre nosotros`
	}, [])
	return (
		<section className="about">
			<Soon />
		</section>
	)
}

export default About
