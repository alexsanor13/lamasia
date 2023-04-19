import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import logo from '../assets/images/logo.webp'
import logoPlaceholder from '../assets/placeholders/logo-placeholder.svg'
import './Header.css'

const Header = () => {
	return (
		<header className="header">
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
					Sobre nosotros
				</a>
			</nav>
		</header>
	)
}

export default Header
