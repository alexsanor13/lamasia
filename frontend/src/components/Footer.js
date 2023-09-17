import React from 'react'
import { NavLink } from 'react-router-dom'

import './Footer.css'
const Footer = () => {
	const classNav = 'footer-nav'

	return (
		<footer>
			<p>
				&copy; {new Date().getFullYear()} La Masia Events.
				<br /> Todos los derechos reservados.
			</p>
			<p>
				<NavLink
					to="/privacy"
					id="privacy-page"
					className={(navData) =>
						navData.isActive ? `${classNav}-link active` : `${classNav}-link`
					}
					aria-label="Privacy">
					Privacidad
				</NavLink>
				&nbsp;
				<NavLink
					to="/termsofuse"
					id="termsOfUse-page"
					className={(navData) =>
						navData.isActive ? `${classNav}-link active` : `${classNav}-link`
					}
					aria-label="Terms of Use">
					Términos de uso
				</NavLink>
			</p>
		</footer>
	)
}

export default Footer
