import 'react-lazy-load-image-component/src/effects/blur.css'
import '@styles/header.css'

import { useEffect } from 'react'
import { Link } from 'react-router-dom'

// Components
import NavBar from '@components/NavBar'

// SVGs
import { useHeaderStore } from '@/stores/headerState'

type HeaderProps = {
	setIsMenuOpen: (isOpen: boolean) => void
}

function Header({ setIsMenuOpen }: HeaderProps) {
	const isHeaderVisible = useHeaderStore((state) => state.isHeaderVisible)
	const setHeaderVisible = useHeaderStore((state) => state.setHeaderVisible)

	useEffect(() => {
		let lastScrollPosition = 0

		const handleScroll = () => {
			const currentScrollPosition = window.scrollY

			const isVisible =
				lastScrollPosition > currentScrollPosition || currentScrollPosition < 20

			setHeaderVisible(isVisible)
			lastScrollPosition = currentScrollPosition
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [setHeaderVisible])

	// const openMenu = () => {
	// 	document.body.style.overflow = 'hidden'
	// 	setIsMenuOpen(true)
	// }

	return (
		<header className={`header ${isHeaderVisible ? '' : 'header-hidden'} `}>
			<div className="header-content">
				<Link aria-label="Home" id="home-page" to="/"></Link>
			</div>
			{/* <BurgerMenuSVG className="header-menu-button" onClick={openMenu} /> */}
			<NavBar setIsMenuOpen={setIsMenuOpen} classNav="header-nav" />
			<div className="header-instagram-container">
				<a
					aria-label="Instagram"
					className="header-instagram"
					href="https://www.instagram.com/lamasiaevents/">
					{/* <InstagramSVG /> */}
				</a>
			</div>
		</header>
	)
}

export default Header
