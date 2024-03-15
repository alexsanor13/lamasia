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
				className={(navData) =>
					navData.isActive ? `${classNav}-link active` : `${classNav}-link`
				}
				onClick={() => handleClick('events')}
				aria-label="Events">
				EVENTOS
			</NavLink>
			<NavLink
				to="/blog"
				id="blog-page"
				className={(navData) =>
					navData.isActive ? `${classNav}-link active` : `${classNav}-link`
				}
				onClick={() => handleClick('blog')}
				aria-label="Blog">
				BLOG
			</NavLink>
			<NavLink
				to="/about"
				id="about-page"
				className={(navData) =>
					navData.isActive ? `${classNav}-link active` : `${classNav}-link`
				}
				onClick={() => handleClick('about')}
				aria-label="About">
				NOSOTROS
			</NavLink>
		</nav>
	)
}

export default NavBar
