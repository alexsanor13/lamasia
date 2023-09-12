import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import transactionsService from '../services/transactions.js'
import './PaymentSuccessful.css'
import Spinner from '../components/Spinner'

const PaymentSuccessful = () => {
	const { order } = useParams()
	const [loading, setLoading] = useState(true)
	const [paymentResponse, setPaymentResponse] = useState({
		eventName: 'PANDORA',
	})

	useEffect(() => {
		// Esta función se ejecutará solo una vez, después del primer renderizado
		transactionsService.getPaymentInfoByOrderId(order).then((fetchedInfo) => {
			setPaymentResponse(fetchedInfo)
		})
		setLoading(false)

		// eslint-disable-next-line
	}, [])

	return (
		<div className="center">
			{loading ? (
				<Spinner />
			) : (
				<div className="success-message">
					<h2>¡Compra Exitosa!</h2>
					<p className="text">
						Tu compra con el ID <span>{order}</span> para el evento{' '}
						<span>{paymentResponse.eventName}</span> se ha completado con éxito.
					</p>
					{/* <p>
						Por favor, revisa tus entradas en la dirección de correo electrónico
						que nos proporcionaste: <span>{paymentResponse.email}</span>
					</p> */}
					<p className="text">
						Por favor, revisa tus entradas en la dirección de correo electrónico
						que nos proporcionaste.
					</p>
				</div>
			)}
		</div>
	)
}

export default PaymentSuccessful
