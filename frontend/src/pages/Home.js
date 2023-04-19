import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import EventsCollection from '../components/EventsCollection'
import './Home.css'

const Home = () => {
	return (
		<div>
			<Header />
			<main>
				<section>
					<h2>Un pirata hace lo que puede</h2>
					<EventsCollection />
				</section>
			</main>
			<Footer />
		</div>
	)
}

export default Home
