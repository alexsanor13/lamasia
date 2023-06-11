import React, { useState, useEffect } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Link } from 'react-router-dom'
import 'react-lazy-load-image-component/src/effects/blur.css'
import logo from '../assets/images/logo.webp'
import logoPlaceholder from '../assets/placeholders/logo-placeholder.svg'
import './Header.css'
import { ReactComponent as InstagramSVG } from '../assets/svg/instagram_no_color.svg'
import { ReactComponent as BurgerMenuSVG } from '../assets/svg/burger_menu.svg'
import NavBar from './NavBar'

const Header = ({ handlePage, setIsMenuOpen }) => {
	const [visible, setVisible] = useState(true)
	const [previousScrollPosition, setPreviousScrollPosition] = useState(0)

	// The header is hidden everytime a scrolldown event is triggered
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
			<BurgerMenuSVG
				className="header-menu-button"
				onClick={() => setIsMenuOpen(true)}
			/>
			<NavBar
				handlePage={handlePage}
				setIsMenuOpen={setIsMenuOpen}
				classNav="header-nav"
			/>
			<div className="header-instagram-container">
				<a
					className="header-instagram"
					href="https://www.instagram.com/lamasiaevents/">
					<InstagramSVG />
				</a>
			</div>
		</header>
	)
}

export default Header
