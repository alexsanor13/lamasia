import React from 'react'
import { NavLink } from 'react-router-dom'
import { ReactComponent as InstagramSVG } from '../assets/svg/instagram.svg'

import './Footer.css'
const Footer = () => {
	const classNav = 'footer-nav'

	return (
		<footer>
			<p>
				&copy; {new Date().getFullYear()} La Masia Events.
				<br /> Todos los derechos reservados.
			</p>
			<div className="instagram">
				<a href="https://www.instagram.com/lamasiaevents/">
					<InstagramSVG />
				</a>
				<div className="instagram-id">@lamasiaevents</div>
			</div>
			<div className="mail">
				<div className="icon-container">📩</div>
				<div className="contact-mail">lamasiaevents.asoc@gmail.com</div>
			</div>
			<p>
				<NavLink
					to="/privacy"
					id="privacy-page"
					className={`${classNav}-link`}
					activeClassName="page-visited">
					Privacidad
				</NavLink>
				&nbsp;
				<NavLink
					to="/termsofuse"
					id="termsOfUse-page"
					className={`${classNav}-link`}
					activeClassName="page-visited">
					Términos de uso
				</NavLink>
			</p>
		</footer>
	)
}

export default Footer
