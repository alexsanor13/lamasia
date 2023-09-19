import React, { useRef, useImperativeHandle, forwardRef, useState } from 'react'
import { QrScanner } from '@yudiel/react-qr-scanner'
import scannerServices from '../services/qrScanner.js'
import { ReactComponent as CameraSVG } from '../assets/svg/camera.svg'
import './QRScannerPage.css'

const QrCodeScanner = forwardRef((props, ref) => {
	// TODO review useRef error in dev
	const scannerRef = useRef(null)
	const [isCameraOpen, setIsCameraOpen] = useState(false)
	const [showLoader, setShowLoader] = useState(false)

	const handleDecode = async (result) => {
		if (showLoader || typeof result === 'undefined') {
			return
		}

		setShowLoader(true)

		const qrData = await scannerServices.scanQR(result)
		if (qrData) {
			const newWindow = window.open()
			if (newWindow) {
				newWindow.document.write(qrData.html)
			} else if (qrData.qrStatus) {
				mobileMessage(qrData.qrStatus)
			}
		}

		setShowLoader(false)
		handleCameraClose()
	}

	const mobileMessage = (message) => {
		const pQR = document.getElementById('resultQR')
		const qrContainerResult = document.getElementById('qrContainerResult')

		alert(message)

		qrContainerResult.style.display = 'block'
		pQR.style.display = 'block'
		pQR.textContent = message
	}

	const resetQRResult = () => {
		const pQR = document.getElementById('resultQR')
		const qrContainerResult = document.getElementById('qrContainerResult')

		pQR.textContent = ''

		qrContainerResult.style.display = 'none'
		pQR.style.display = 'none'
	}

	const handleError = (error) => {
		console.error(error?.message)
	}

	const handleScanCamera = () => {
		if (!isCameraOpen) {
			setIsCameraOpen(true)
			resetQRResult()
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

	const scannerQR = isCameraOpen && (
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
			/>
		</div>
	)

	return (
		<section className="scanner">
			<div className="action-buttons">
				<button onClick={handleScanCamera}>
					<CameraSVG className="camera-svg" />
				</button>
				<button onClick={handleCameraClose}>Cerrar cámara</button>
			</div>
			{scannerQR}
			<div id="qrContainerResult">
				<p id="resultQR"></p>
			</div>
		</section>
	)
})

export default QrCodeScanner
