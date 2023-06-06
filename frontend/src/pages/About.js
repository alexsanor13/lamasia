import './About.css'
import Soon from '../components/Soon'
import { useEffect } from 'react'
const About = () => {
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
