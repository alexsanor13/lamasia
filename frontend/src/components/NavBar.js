// NavBar.js
import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = ({ handlePage, setIsMenuOpen, classNav = 'header-nav' }) => {
	const handleClick = (targetPath) => {
		handlePage(targetPath)
		setIsMenuOpen(false)
	}
	return (
		<nav className={classNav} id="headerNav">
			<Link
				to="/events"
				id="events-page"
				className={`${classNav}-link`}
				onClick={() => handleClick('events')}>
				EVENTOS
			</Link>
			<Link
				to="/blog"
				id="blog-page"
				className={`${classNav}-link`}
				onClick={() => handleClick('blog')}>
				BLOG
			</Link>
			<Link
				to="/about"
				id="about-page"
				className={`${classNav}-link`}
				onClick={() => handleClick('about')}>
				NOSOTROS
			</Link>
		</nav>
	)
}

export default NavBar
