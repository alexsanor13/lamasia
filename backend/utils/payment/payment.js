const Redsys = require('node-redsys-api').Redsys
const { TPV } = require('../config')

//Snippet to obtain the signature & merchantParameters

const redsys = new Redsys()

function generateOrderId(length) {
	const numericChars = '0123456789'
	const alphanumericChars =
		'0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
	const orderIdArray = []

	// Generar los primeros 4 dígitos numéricos
	for (let i = 0; i < 4; i++) {
		const randomIndex = Math.floor(Math.random() * numericChars.length)
		orderIdArray.push(numericChars.charAt(randomIndex))
	}

	// Generar los caracteres alfanuméricos restantes
	for (let i = 4; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * alphanumericChars.length)
		orderIdArray.push(alphanumericChars.charAt(randomIndex))
	}

	// Mezclar aleatoriamente los caracteres en el Order ID
	for (let i = orderIdArray.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		;[orderIdArray[i], orderIdArray[j]] = [orderIdArray[j], orderIdArray[i]]
	}

	return orderIdArray.join('')
}

function createPayment(total, orderId) {
	const params = {
		DS_MERCHANT_AMOUNT: total,
		DS_MERCHANT_ORDER: orderId,
		DS_MERCHANT_MERCHANTCODE: TPV.MERCHANTCODE,
		DS_MERCHANT_CURRENCY: TPV.CURRENCY,
		DS_MERCHANT_TRANSACTIONTYPE: TPV.TRANSACTIONTYPE,
		DS_MERCHANT_TERMINAL: TPV.TERMINAL,
		// DS_MERCHANT_MERCHANTURL: TPV.URLCALLBACK,
		// DS_MERCHANT_URLOK: TPV.URLCALLBACK,
		// DS_MERCHANT_URLKO: TPV.URLCALLBACK,
	}

	return {
		Ds_Signature: redsys.createMerchantSignature(TPV.SECRET, params),
		Ds_MerchantParameters: redsys.createMerchantParameters(params),
		Ds_SignatureVersion: TPV.SIGNATURE_VERSION,
	}
}

function processPayment(paymentInfo) {
	try {
		const { Ds_Signature, Ds_MerchantParameters, raw } = paymentInfo

		const merchantParamsDecoded = redsys.decodeMerchantParameters(
			Ds_MerchantParameters
		)

		const merchantSignatureNotif = redsys.createMerchantSignatureNotif(
			TPV.SECRET,
			Ds_MerchantParameters
		)
		const dsResponse = parseInt(
			merchantParamsDecoded.Ds_Response || merchantParamsDecoded.DS_RESPONSE,
			10
		)

		const isValid =
			redsys.merchantSignatureIsValid(Ds_Signature, merchantSignatureNotif) &&
			dsResponse > -1 &&
			dsResponse < 100

		if (isValid) {
			/* TPV payment is OK;
			 */
			return true
		} else {
			/* 'TPV payment is KO;
			 */
			return false
		}
	} catch (error) {
		throw Error('Payment process failed')
	}
}

module.exports = {
	processPayment,
	createPayment,
	generateOrderId,
}
