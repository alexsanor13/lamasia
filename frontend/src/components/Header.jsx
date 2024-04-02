import React, { useState, useEffect } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Link } from 'react-router-dom'
import logo from '../assets/images/logo.webp'
import NavBar from './NavBar'
import 'react-lazy-load-image-component/src/effects/blur.css'
import './Header.css'

import logoPlaceholder from '../assets/placeholders/logo.svg'
import InstagramSVG from '../assets/svg/instagram_no_color.svg?react'
import BurgerMenuSVG from '../assets/svg/burger_menu.svg?react'

const Header = ({ handlePage, setIsMenuOpen }) => {
	const [visible, setVisible] = useState(true)
	const [previousScrollPosition, setPreviousScrollPosition] = useState(0)

	// The header is hidden everytime a scrolldown event is triggered (20px)
	useEffect(() => {
		const handleScroll = () => {
			const currentScrollPosition = window.scrollY

			const isVisible =
				previousScrollPosition > currentScrollPosition ||
				currentScrollPosition < 20

			setPreviousScrollPosition(currentScrollPosition)
			setVisible(isVisible)
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [previousScrollPosition])

	const openMenu = () => {
		document.body.style.overflow = 'hidden'
		setIsMenuOpen(true)
	}

	return (
		<header className={`header ${visible ? '' : 'header-hidden'} `}>
			<div className="header-content">
				<Link
					aria-label="Home"
					to="/"
					id="home-page"
					onClick={() => handlePage('')}>
					<LazyLoadImage
						src={logo}
						placeholderSrc={logoPlaceholder}
						alt="La Masia Logo"
						effect="blur"
						className="header-logo"
					/>
				</Link>
			</div>
			<BurgerMenuSVG className="header-menu-button" onClick={openMenu} />
			<NavBar
				handlePage={handlePage}
				setIsMenuOpen={setIsMenuOpen}
				classNav="header-nav"
			/>
			<div className="header-instagram-container">
				<a
					aria-label="Instagram"
					className="header-instagram"
					href="https://www.instagram.com/lamasiaevents/">
					<InstagramSVG />
				</a>
			</div>
		</header>
	)
}

export default Header
