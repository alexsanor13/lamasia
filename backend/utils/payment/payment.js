const Redsys = require('node-redsys-api').Redsys
const { TPV } = require('../config')
const Order = require('../../models/Order')
const { throwErrors } = require('../middleware/throwErrors')

const redsys = new Redsys()

function generateOrderId() {
	try {
		const numericChars = '0123456789'
		const alphanumericChars =
			'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

		let orderId = ''

		for (let i = 0; i < 4; i++) {
			orderId += numericChars.charAt(
				Math.floor(Math.random() * numericChars.length)
			)
		}

		for (let i = 0; i < 8; i++) {
			orderId += alphanumericChars.charAt(
				Math.floor(Math.random() * alphanumericChars.length)
			)
		}

		return orderId
	} catch (e) {
		throw new Error('Error creating random orderId')
	}
}

async function createRedirection(total, paymentMethod = '') {
	try {
		const orderId = generateOrderId()

		const newOrder = new Order({
			orderId,
			amount: total,
			currency: TPV.CURRENCY,
			status: 'PENDING_PAYMENT',
		})

		await newOrder.save()

		console.log(`New ORDER ID ${orderId} with status 'PENDING_PAYMENT'`)

		const params = {
			DS_MERCHANT_TRANSACTIONTYPE: TPV.TRANSACTIONTYPE,
			DS_MERCHANT_ORDER: orderId,
			DS_MERCHANT_AMOUNT: Number(total) * 100,
			DS_MERCHANT_CURRENCY: TPV.CURRENCY,
			DS_MERCHANT_MERCHANTCODE: TPV.MERCHANTCODE,
			DS_MERCHANT_MERCHANTNAME: 'La Masia Events',
			DS_MERCHANT_TERMINAL: TPV.TERMINAL,
			DS_MERCHANT_PAYMETHODS: '',
			DS_MERCHANT_MERCHANTURL: `${TPV.URLCALLBACK}`,
			DS_MERCHANT_URLOK: `${TPV.URLCALLBACK_OK}${orderId}`,
			DS_MERCHANT_URLKO: `https://www.lamasiaevents.com`,
			// DS_MERCHANT_MERCHANTURL: `https://breezy-pens-judge.loca.lt/api/tickets/redsysresponse`,
		}

		const Ds_Signature = redsys.createMerchantSignature(TPV.SECRET, params)
		if (!Ds_Signature) {
			throw new Error('Error creating Merchant Signature')
		}
		console.log(`ORDER ID ${orderId} has created the MS`)

		const Ds_MerchantParameters = redsys.createMerchantParameters(params)
		if (!Ds_MerchantParameters) {
			throw new Error('Error creating Merchant Parameters')
		}
		console.log(`ORDER ID ${orderId} has created the MP`)

		const Ds_SignatureVersion = TPV.SIGNATURE_VERSION
		const formHtml = `
			<!DOCTYPE html>
			<html>
			<body>
			<form action="${TPV.URL}" method="post" target="_blank">
				<input type="hidden" id="Ds_SignatureVersion" name="Ds_SignatureVersion" value="${Ds_SignatureVersion}" />
				<input type="hidden" id="Ds_MerchantParameters" name="Ds_MerchantParameters" value="${Ds_MerchantParameters}" />
				<input type="hidden" id="Ds_Signature" name="Ds_Signature" value="${Ds_Signature}"/>
			</form>
			</body>
			</html>
		`
		return { form: formHtml, actionURL: TPV.URL, orderId }
	} catch (error) {
		throw new Error(`Error creating redirection to redsys: ${error}`)
	}
}

function getPaymentParameters(paymentInfo) {
	try {
		const { Ds_Signature, Ds_MerchantParameters } = paymentInfo

		const merchantParamsDecoded = redsys.decodeMerchantParameters(
			Ds_MerchantParameters
		)
		if (!merchantParamsDecoded) {
			throwErrors('MP not decoded', 'redsys.decodeMerchantParameters')
			return
		}

		const merchantSignatureNotif = redsys.createMerchantSignatureNotif(
			TPV.SECRET,
			Ds_MerchantParameters
		)
		if (!merchantSignatureNotif) {
			throwErrors(
				'MS notification error',
				'redsys.createMerchantSignatureNotif'
			)
			return
		}

		const dsResponse = parseInt(
			merchantParamsDecoded.Ds_Response || merchantParamsDecoded.DS_RESPONSE,
			10
		)

		const isValidDSResponse = dsResponse > -1 && dsResponse < 100
		if (!isValidDSResponse) {
			throwErrors(
				'dsResponse is not valid:' + dsResponse,
				'dsResponse > -1 && dsResponse < 100'
			)
			return
		}

		const isValidSignature = redsys.merchantSignatureIsValid(
			Ds_Signature,
			merchantSignatureNotif
		)
		if (!isValidSignature) {
			throwErrors('MS not valid', 'redsys.merchantSignatureIsValid')
			return
		}

		return merchantParamsDecoded
	} catch (error) {
		throw Error('Error getting the merchantParamsDecoded' + error)
	}
}

module.exports = {
	generateOrderId,
	createRedirection,
	getPaymentParameters,
}
