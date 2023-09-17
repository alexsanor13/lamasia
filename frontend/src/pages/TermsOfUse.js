import React, { useEffect } from 'react'
import './PolicyTerms.css'

const TermsOfUse = () => {
	useEffect(() => {
		window.scrollTo(0, 0)
		document.title = 'Términos de Uso'
	}, [])

	return (
		<div className="policy-terms-container">
			<h1>Términos de Uso</h1>
			<p className="last-updated">
				Última actualización: 16 de Septiembre de 2023
			</p>
			<p>
				Bienvenido a La Masia Events ("Nosotros", "nuestro" o "nos"). Al acceder
				y utilizar nuestro sitio web y servicios, aceptas cumplir con los
				siguientes términos y condiciones. Si no estás de acuerdo con estos
				términos, por favor, no utilices nuestro sitio web ni nuestros
				servicios.
			</p>
			<h2>Uso del Sitio Web</h2>
			<ul>
				<li>
					Debes tener al menos <b>18 años de edad</b> para acceder a cualquiera
					de los eventos.
				</li>
				<li>
					Aceptas utilizar nuestro sitio web y servicios solo con fines legales
					y éticos.
				</li>
				<li>
					No puedes utilizar nuestro sitio web para actividades ilegales o
					fraudulentas.
				</li>
			</ul>
			<h2>Propiedad Intelectual</h2>
			<ul>
				<li>
					Todo el contenido de nuestro sitio web, incluyendo textos, imágenes y
					logotipos, está protegido por derechos de autor y otros derechos de
					propiedad intelectual.
				</li>
				<li>
					No puedes utilizar, reproducir o distribuir nuestro contenido sin
					nuestro permiso explícito por escrito.
				</li>
			</ul>
			<h2>Compra de Entradas</h2>
			<ul>
				<li>
					Al realizar una compra de entradas a través de nuestro sitio web,
					aceptas los términos y condiciones específicos del evento y la
					política de reembolso correspondiente.
				</li>
				<li>
					Nos reservamos el derecho de cancelar o modificar eventos y reembolsos
					según nuestras políticas.
				</li>
			</ul>
			<h2>Limitación de Responsabilidad</h2>
			<ul>
				<li>
					No somos responsables de eventos cancelados, cambios de horario u
					otros problemas relacionados con los eventos.
				</li>
				<li>
					No asumimos responsabilidad por pérdidas o daños que puedan surgir
					como resultado de tu uso de nuestro sitio web o servicios.
				</li>
			</ul>
			<h2>Cambios en los Términos</h2>
			<p>
				Nos reservamos el derecho de actualizar estos Términos de Uso en
				cualquier momento. Te notificaremos sobre cualquier cambio importante en
				nuestros términos.
			</p>
			<h2>Contáctanos</h2>
			<p>
				Si tienes alguna pregunta o preocupación sobre nuestros Términos de Uso,
				no dudes en contactarnos en{' '}
				<a aria-label="Email" href="mailto:lamasiaevents.asoc@gmail.com">
					lamasiaevents.asoc@gmail.com
				</a>
				.
			</p>
		</div>
	)
}

export default TermsOfUse
