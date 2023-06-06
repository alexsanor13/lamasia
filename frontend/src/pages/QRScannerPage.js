import React, { useRef, useImperativeHandle, forwardRef, useState } from 'react'
import { QrScanner } from '@yudiel/react-qr-scanner'
import './QRScannerPage.css'

const QrCodeScanner = forwardRef((props, ref) => {
	const scannerRef = useRef(null)
	const [isCameraOpen, setIsCameraOpen] = useState(false)

	const handleDecode = (result) => {
		if (typeof result !== Number) {
			console.log(result)
		}
		// Puedes manejar el resultado del código QR como prefieras aquí
	}

	const handleError = (error) => {
		console.error(error?.message)
	}

	const handleScanCamera = () => {
		if (!isCameraOpen) {
			setIsCameraOpen(true)
		}
	}

	const handleCameraClose = () => {
		if (isCameraOpen) {
			setIsCameraOpen(false)
		}
	}

	// Exponer métodos del componente al padre a través de la referencia
	useImperativeHandle(ref, () => ({
		startScanner: handleScanCamera,
		stopScanner: handleCameraClose,
	}))

	const cameraSVG = (
		<svg
			className="camera-svg"
			width="32px"
			height="32px"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<rect width="24" height="24" fill="none" />
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M12 11C10.8954 11 10 11.8954 10 13C10 14.1046 10.8954 15 12 15C13.1046 15 14 14.1046 14 13C14 11.8954 13.1046 11 12 11Z"
				fill="#323232"
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M21.9997 9.50393C21.9997 9.53746 21.9996 9.57132 21.9996 9.60552L21.9996 16.0658C21.9997 16.9523 21.9997 17.7161 21.9175 18.3278C21.8294 18.9833 21.6306 19.6116 21.121 20.1213C20.6113 20.631 19.9829 20.8297 19.3274 20.9178C18.7158 21.0001 17.9519 21 17.0654 21H6.93383C6.04734 21 5.28351 21.0001 4.67185 20.9178C4.01633 20.8297 3.38798 20.631 2.87832 20.1213C2.36866 19.6116 2.16991 18.9833 2.08178 18.3278C1.99954 17.7161 1.99959 16.9523 1.99964 16.0658L1.99964 9.60552C1.99964 9.57132 1.99961 9.53746 1.99957 9.50393C1.99913 9.0428 1.99875 8.64526 2.08406 8.29327C2.3487 7.20148 3.20115 6.34903 4.29295 6.08439C4.64493 5.99908 5.04247 5.99946 5.5036 5.9999C5.53713 5.99994 5.57099 5.99997 5.60519 5.99997C5.95148 5.99997 6.0212 5.99736 6.07751 5.98892C6.30563 5.95473 6.51491 5.84272 6.66991 5.67188C6.70816 5.62971 6.74901 5.57314 6.94109 5.28502L7.16759 4.94527C7.19048 4.91093 7.21314 4.87685 7.23561 4.84304C7.56336 4.34999 7.85245 3.91512 8.2627 3.60547C8.51087 3.41815 8.78666 3.27056 9.08018 3.16797C9.56539 2.99838 10.0876 2.99907 10.6796 2.99986C10.7202 2.99992 10.7612 2.99997 10.8024 2.99997L13.1969 2.99997C13.2381 2.99997 13.2791 2.99992 13.3197 2.99986C13.9117 2.99907 14.4339 2.99838 14.9191 3.16797C15.2126 3.27056 15.4884 3.41815 15.7366 3.60547C16.1468 3.91512 16.4359 4.35 16.7637 4.84304C16.7861 4.87685 16.8088 4.91094 16.8317 4.94527L17.0582 5.28502C17.2503 5.57314 17.2911 5.62971 17.3294 5.67188C17.4844 5.84272 17.6937 5.95473 17.9218 5.98892C17.9781 5.99736 18.0478 5.99997 18.3941 5.99997C18.4283 5.99997 18.4622 5.99994 18.4957 5.9999C18.9568 5.99946 19.3544 5.99908 19.7063 6.08439C20.7981 6.34903 21.6506 7.20148 21.9152 8.29327C22.0005 8.64526 22.0001 9.0428 21.9997 9.50393ZM7.99977 13C7.99977 10.7909 9.79063 9 11.9998 9C14.2089 9 15.9998 10.7909 15.9998 13C15.9998 15.2091 14.2089 17 11.9998 17C9.79063 17 7.99977 15.2091 7.99977 13Z"
				fill="#323232"
			/>
		</svg>
	)

	return (
		<section className="scanner">
			<div className="action-buttons">
				<button onClick={handleScanCamera}>{cameraSVG}</button>
				<button onClick={handleCameraClose}>Cerrar cámara</button>
			</div>
			{isCameraOpen ? (
				<div className="qr-container">
					<QrScanner
						onDecode={handleDecode}
						onError={handleError}
						constraints={{ facingMode: 'environment' }}
						ref={scannerRef}
						videoStyle={{ width: '100%', height: '400px', maxWidth: '500px' }}
						containerStyle={{
							width: '500px',
							maxWidth: '100%',
							height: '400px',
							paddingTop: 'none',
						}}
					/>{' '}
				</div>
			) : (
				''
			)}
		</section>
	)
})

export default QrCodeScanner
