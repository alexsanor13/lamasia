import '@styles/App.css'

import { useState, createRef } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

// Components
import Footer from '@components/Footer'
import Header from '@components/Header'
import NavBar from '@components/NavBar'

// Pages
import About from '@pages/About'
import Blog from '@pages/Blog'
import EventDetail from '@pages/EventDetail'
import Events from '@pages/Events'
import PaymentSuccessful from '@pages/PaymentSuccessful'
import PrivacyPolicy from '@pages/PrivacyPolicy'
import QRScannerPage from '@pages/QRScannerPage'
import TermsOfUse from '@pages/TermsOfUse'

// SVGs
// import { ReactComponent as ExitMenuSVG } from '@assets/svg/logo.svg'

function App() {
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	const headerRef = createRef<HTMLHeadElement>()

	const openMenu = () => {
		document.body.style.overflow = 'auto'
		setIsMenuOpen(false)
	}

	return (
		<Router>
			<div className="app">
				<Header setIsMenuOpen={setIsMenuOpen} />
				<main>
					<Routes>
						<Route
							path="/"
							element={<>Tests in events before enable routing</>}
							index
						/>
						{/* <Route path="/events/:id" element={<EventDetail />} />
						<Route path="/about" element={<About />} />
						<Route path="/blog" element={<Blog />} />
						<Route path="/scanner" element={<QRScannerPage />} />
						<Route
							path="/paymentsuccessful/:order"
							element={<PaymentSuccessful />}
						/>
						<Route path="/termsofuse" element={<TermsOfUse />} />
						<Route path="/privacy" element={<PrivacyPolicy />} /> */}
					</Routes>
				</main>
				<Footer />
				{isMenuOpen && (
					<>
						<div className="exit-button-container">
							{/* <ExitMenuSVG className="exit-menu-button" onClick={openMenu} /> */}
						</div>
						<NavBar setIsMenuOpen={setIsMenuOpen} classNav={'mobile-menu'} />
					</>
				)}
			</div>
		</Router>
	)
}

export default App
