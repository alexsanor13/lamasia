import React, { useState, useRef } from 'react'

import './QRScannerPage.css'

const QRScannerPage = () => {
	const [scannedResult, setScannedResult] = useState('')
	const [isCameraVisible, setIsCameraVisible] = useState(true)
	const videoRef = useRef(null)
	const fileInputRef = useRef(null)
	const canvasRef = useRef(null)

	const handleScanCamera = () => {
		// Solicitar permisos al usuario para acceder a la cámara
		navigator.mediaDevices
			.getUserMedia({ video: true })
			.then((stream) => {
				// Acceder al elemento de video y reproducir el stream de la cámara
				videoRef.current.srcObject = stream
				videoRef.current.play()
			})
			.catch((error) => {
				console.error('Error al acceder a la cámara:', error)
			})
	}

	const handleFileInputChange = (event) => {
		const file = event.target.files[0]
		if (file) {
			const reader = new FileReader()

			reader.onload = () => {
				const imageDataUrl = reader.result

				// Realizar el procesamiento necesario del QR a partir de la imagen seleccionada
				// Aquí puedes implementar tu lógica de desencriptación y manejo del resultado escaneado

				// Actualizar el estado con el resultado escaneado
				setScannedResult('Resultado del escaneo')
			}

			reader.readAsDataURL(file)
		}
	}

	const handleCameraClose = () => {
		if (videoRef.current && videoRef.current.srcObject) {
			videoRef.current.srcObject.getTracks().forEach((track) => track.stop())
		}
		setIsCameraVisible(false)
	}

	const handleScanFile = () => {
		fileInputRef.current.click()
	}

	const handleScanResult = () => {
		// Detener la reproducción del video
		videoRef.current.pause()

		// Obtener el contexto del canvas
		const canvas = canvasRef.current
		const context = canvas.getContext('2d')

		// Configurar el tamaño del canvas para que coincida con el tamaño del video
		canvas.width = videoRef.current.videoWidth
		canvas.height = videoRef.current.videoHeight

		// Dibujar el fotograma actual del video en el canvas
		context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height)

		// Obtener la imagen del canvas en formato de datos URL
		const imageDataUrl = canvas.toDataURL('image/png')

		// Realizar el procesamiento necesario del QR, por ejemplo, utilizando una librería de escaneo de QR
		// Aquí puedes implementar tu lógica de desencriptación y manejo del resultado escaneado

		// Actualizar el estado con el resultado escaneado
		setScannedResult('Resultado del escaneo')

		// Detener la reproducción del video y detener el acceso a la cámara
		videoRef.current.srcObject.getTracks().forEach((track) => track.stop())
	}

	return (
		<section className="scanner">
			<div className="action-buttons">
				<button onClick={handleScanCamera}>
					<svg
						className="camera-svg"
						width="800px"
						height="800px"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
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
				</button>
				<button onClick={handleCameraClose}>Cerrar cámara</button>
				<button onClick={handleScanFile}>
					<svg
						className="file-image-svg"
						fill="#000000"
						width="800px"
						height="800px"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M6 22h12a2 2 0 0 0 2-2V8l-6-6H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2zm7-18 5 5h-5V4zm-4.5 7a1.5 1.5 0 1 1-.001 3.001A1.5 1.5 0 0 1 8.5 11zm.5 5 1.597 1.363L13 13l4 6H7l2-3z" />
					</svg>
				</button>
			</div>
			<input
				type="file"
				accept="image/*"
				style={{ display: 'none' }}
				ref={fileInputRef}
				onChange={handleFileInputChange}
			/>
			<div style={{ display: isCameraVisible ? 'block' : 'none' }}>
				<video ref={videoRef}></video>
				<canvas ref={canvasRef}></canvas>
			</div>
			<div>{scannedResult}</div>
		</section>
	)
}

export default QRScannerPage
