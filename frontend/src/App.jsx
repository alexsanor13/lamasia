import './App.css'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Events from './pages/Events'
import EventDetail from './pages/EventDetail'
import QRScannerPage from './pages/QRScannerPage'
import ExitMenuSVG from './assets/svg/cross.svg?react'

import About from './pages/About'
import Blog from './pages/Blog'
import PaymentSuccessful from './pages/PaymentSuccessful'
import NavBar from './components/NavBar'
import TermsOfUse from './pages/TermsOfUse'
import PrivacyPolicy from './pages/PrivacyPolicy'

const App = () => {
	const [currentPage, setPage] = useState(window.location.href)
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const title = 'La Masia Events'

	useEffect(() => {
		document.title = title
	}, [currentPage, title])

	const handlePage = (page) => {
		try {
			document.body.style.overflow = 'auto'
			setPage(page)
		} catch (err) {
			console.error(err)
		}
	}

	const openMenu = () => {
		document.body.style.overflow = 'auto'
		setIsMenuOpen(false)
	}

	return (
		<Router>
			<div className="app">
				<Header handlePage={handlePage} setIsMenuOpen={setIsMenuOpen} />
				<main>
					<Routes>
						<Route
							path="/"
							element={<Events handlePage={handlePage} />}
							index
						/>
						<Route path="/events/:id" element={<EventDetail />} />
						<Route path="/about" element={<About />} />
						<Route path="/blog" element={<Blog />} />
						<Route path="/scanner" element={<QRScannerPage />} />
						<Route
							path="/paymentsuccessful/:order"
							element={<PaymentSuccessful />}
						/>
						<Route path="/termsofuse" element={<TermsOfUse />} />
						<Route path="/privacy" element={<PrivacyPolicy />} />
					</Routes>
				</main>
				<Footer />
				{isMenuOpen && (
					<>
						<div className="exit-button-container">
							<ExitMenuSVG className="exit-menu-button" onClick={openMenu} />
						</div>
						<NavBar
							handlePage={handlePage}
							setIsMenuOpen={setIsMenuOpen}
							classNav={'mobile-menu'}
						/>
					</>
				)}
			</div>
		</Router>
	)
}

export default App
