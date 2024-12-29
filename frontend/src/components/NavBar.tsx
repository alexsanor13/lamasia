// NavBar.js
import { NavLink } from 'react-router-dom'

type NavBarProps = {
	setIsMenuOpen: (isOpen: boolean) => void
	classNav?: string
}

const NavBar = ({ setIsMenuOpen, classNav = 'header-nav' }: NavBarProps) => {
	const handleClick = () => {
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
				onClick={() => handleClick()}
				aria-label="Events">
				EVENTOS
			</NavLink>
			<NavLink
				to="/blog"
				id="blog-page"
				className={(navData) =>
					navData.isActive ? `${classNav}-link active` : `${classNav}-link`
				}
				onClick={() => handleClick()}
				aria-label="Blog">
				BLOG
			</NavLink>
			<NavLink
				to="/about"
				id="about-page"
				className={(navData) =>
					navData.isActive ? `${classNav}-link active` : `${classNav}-link`
				}
				onClick={() => handleClick()}
				aria-label="About">
				NOSOTROS
			</NavLink>
		</nav>
	)
}

export default NavBar
