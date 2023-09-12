import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import transactionsService from '../services/transactions.js'
import './EventDetail.css'
import Spinner from '../components/Spinner'

const PaymentSuccessful = () => {
	const { order } = useParams()
	const [loading, setLoading] = useState(true)
	const [paymentResponse, setPaymentResponse] = useState(null)

	useEffect(() => {
		transactionsService.getPaymentInfoByOrderId(order).then((fetchedInfo) => {
			setPaymentResponse(fetchedInfo)
			setLoading(false)
		})
	}, [order])

	return (
		<div className="center">
			{loading ? (
				<Spinner />
			) : (
				<div className="success-message">
					<h2>¡Compra Exitosa!</h2>
					<p>
						Tu compra con el ID {paymentResponse.orderId} para el evento "
						{paymentResponse.eventName}" se ha completado con éxito.
					</p>
					<p>
						Por favor, revisa tus entradas en la dirección de correo electrónico
						que nos proporcionaste: {paymentResponse.email}
					</p>
				</div>
			)}
		</div>
	)
}

export default PaymentSuccessful
