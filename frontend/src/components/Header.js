import React, { useState, useEffect } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Link } from 'react-router-dom'
import 'react-lazy-load-image-component/src/effects/blur.css'
import logo from '../assets/images/logo.webp'
import logoPlaceholder from '../assets/placeholders/logo-placeholder.svg'
import './Header.css'

const Header = ({ handlePage }) => {
	const [visible, setVisible] = useState(true)
	const [previousScrollPosition, setPreviousScrollPosition] = useState(0)

	// The header is hidden everytime a scrolldown event is triggered
	useEffect(() => {
		const handleScroll = () => {
			const currentScrollPosition = window.pageYOffset

			const isVisible =
				previousScrollPosition > currentScrollPosition ||
				currentScrollPosition < 20

			setPreviousScrollPosition(currentScrollPosition)
			setVisible(isVisible)
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [previousScrollPosition])

	console.log('Header rendered')

	return (
		<header className={`header ${visible ? '' : 'header-hidden'} `}>
			<div className="header-content">
				<Link to="/" id="home-page" onClick={() => handlePage('')}>
					<LazyLoadImage
						src={logo}
						placeholderSrc={logoPlaceholder}
						alt="La Masia Logo"
						effect="blur"
						className="header-logo"
					/>
				</Link>
			</div>

			<nav className="header-nav">
				<Link
					to="/events"
					id="events-page"
					className="header-nav-link"
					onClick={() => handlePage('events')}>
					Eventos
				</Link>
				<Link
					to="/blog"
					id="blog-page"
					className="header-nav-link"
					onClick={() => handlePage('blog')}>
					Blog
				</Link>
				<Link
					to="/about"
					id="about-page"
					className="header-nav-link"
					onClick={() => handlePage('about')}>
					Nosotros
				</Link>
			</nav>
		</header>
	)
}

export default Header
