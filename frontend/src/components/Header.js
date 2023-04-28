import React, { useState, useEffect } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import logo from '../assets/images/logo.webp'
import logoPlaceholder from '../assets/placeholders/logo-placeholder.svg'
import './Header.css'

const Header = () => {
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

	return (
		<header className={`header ${visible ? '' : 'header-hidden'} `}>
			<div className="header-content">
				<LazyLoadImage
					src={logo}
					placeholderSrc={logoPlaceholder}
					alt="La Masia Logo"
					effect="blur"
					className="header-logo"
				/>
			</div>

			<nav className="header-nav">
				<a href="/eventos" className="header-nav-link">
					Eventos
				</a>
				<a href="/sobre-nosotros" className="header-nav-link">
					Blog
				</a>
				<a href="/sobre-nosotros" className="header-nav-link">
					Sobre nosotros
				</a>
			</nav>
		</header>
	)
}

export default Header
