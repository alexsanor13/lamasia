import React from 'react'

const Footer = () => {
	console.log('Footer rendered')
	return (
		<footer>
			<p>
				&copy; {new Date().getFullYear()} La Masia. Todos los derechos
				reservados.
			</p>
			<div>
				<a href="https://www.facebook.com">Facebook</a>
				<a href="https://www.twitter.com">Twitter</a>
				<a href="https://www.instagram.com">Instagram</a>
			</div>
		</footer>
	)
}

export default Footer
