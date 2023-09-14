const Redsys = require('node-redsys-api').Redsys
const { TPV } = require('../config')
const Order = require('../../models/Order')

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
		throw new Error('Error creating random OrderId')
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

		console.log(
			`New order saved with ID: ${orderId} in status 'PENDING_PAYMENT'`
		)

		const params = {
			DS_MERCHANT_TRANSACTIONTYPE: TPV.TRANSACTIONTYPE,
			DS_MERCHANT_ORDER: orderId,
			DS_MERCHANT_AMOUNT: total * 100,
			DS_MERCHANT_CURRENCY: TPV.CURRENCY,
			DS_MERCHANT_MERCHANTCODE: TPV.MERCHANTCODE,
			DS_MERCHANT_MERCHANTNAME: 'La Masia Events',
			DS_MERCHANT_TERMINAL: TPV.TERMINAL,
			DS_MERCHANT_PAYMETHODS: paymentMethod,
			// DS_MERCHANT_MERCHANTURL: `${TPV.URLCALLBACK}`,
			DS_MERCHANT_URLOK: `${TPV.URLCALLBACK_OK}${orderId}`,
			// DS_MERCHANT_URLKO: `${TPV.URLCALLBACK}/${orderId}`,
			DS_MERCHANT_MERCHANTURL: `https://two-ends-add.loca.lt/api/tickets/redsysresponse`,
			// DS_MERCHANT_URLOK: `https://honest-fans-shine.loca.lt/paymentsuccessful/${orderId}`,
			// DS_MERCHANT_URLKO: `https://honest-fans-shine.loca.lt/api/tickets/redsysresponseKO`,
		}
		const Ds_Signature = redsys.createMerchantSignature(TPV.SECRET, params)
		const Ds_MerchantParameters = redsys.createMerchantParameters(params)
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
			return merchantParamsDecoded
		} else {
			/* 'TPV payment is KO;
			 */
			return null
		}
	} catch (error) {
		throw Error('Error getting the merchantParamsDecoded')
	}
}

module.exports = {
	generateOrderId,
	createRedirection,
	getPaymentParameters,
}
