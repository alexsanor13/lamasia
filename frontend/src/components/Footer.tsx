import { NavLink } from 'react-router-dom'

import '@styles/footer.css'

const Footer = () => {
	const classNav = 'footer-nav'

	return (
		<footer>
			<p>
				&copy; {new Date().getFullYear()} La Masia Events.
				<br /> Todos los derechos reservados.
			</p>
			<p className="footer-links">
				<NavLink
					to="/privacy"
					id="privacy-page"
					className={(navData) =>
						navData.isActive ? `${classNav}-link active` : `${classNav}-link`
					}
					aria-label="Privacidad">
					Privacidad
				</NavLink>
				&nbsp;
				<NavLink
					to="/termsofuse"
					id="termsOfUse-page"
					className={(navData) =>
						navData.isActive ? `${classNav}-link active` : `${classNav}-link`
					}
					aria-label="Términos de uso">
					Términos de uso
				</NavLink>
			</p>
		</footer>
	)
}

export default Footer
