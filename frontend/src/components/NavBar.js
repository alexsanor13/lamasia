// NavBar.js
import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = ({ handlePage, setIsMenuOpen, classNav = 'header-nav' }) => {
	const handleClick = (targetPath) => {
		handlePage(targetPath)
		setIsMenuOpen(false)
	}
	return (
		<nav className={classNav} id="headerNav">
			<NavLink
				to="/"
				id="events-page"
				className={`${classNav}-link`}
				activeClassName="page-visited"
				onClick={() => handleClick('events')}>
				EVENTOS
			</NavLink>
			<NavLink
				to="/blog"
				id="blog-page"
				className={`${classNav}-link`}
				activeClassName="page-visited"
				onClick={() => handleClick('blog')}>
				BLOG
			</NavLink>
			<NavLink
				to="/about"
				id="about-page"
				className={`${classNav}-link`}
				activeClassName="page-visited"
				onClick={() => handleClick('about')}>
				NOSOTROS
			</NavLink>
		</nav>
	)
}

export default NavBar
