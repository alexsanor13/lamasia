require('dotenv').config()
// Env https://humanwhocodes.com/blog/2021/02/introducing-env-javascript-environment-variables/#fn:1
const { Env } = require('@humanwhocodes/env')
const env = new Env()

let debugMode = false
if (process.argv.includes('--mode=debug')) {
	debugMode = true
}

const PORT = env.first(['PORT', 'HTTP_PORT'], 8080)
const MONGO_DB_URI = debugMode
	? env.get('MONGO_DB_URI')
	: env.get('MONGO_DB_URI_PROD')

const CRYPTO_QR = env.get('CRYPTO_QR')

const rateLimit = require('express-rate-limit')

const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 200, // limit each IP to 100 requests per windowMs
	message: 'Too many requests from this IP, please try again later',
})

const QR_CONTAINER = env.get('QR_CONTAINER')

const EMAIL = env.get('EMAIL')
const EMAIL_PASS = env.get('EMAIL_PASS')

const TPV = {
	MERCHANTCODE: env.get('TPV_DS_MERCHANT_MERCHANTCODE')
		? Number(env.get('TPV_DS_MERCHANT_MERCHANTCODE'))
		: null,
	TERMINAL: env.get('TPV_DS_MERCHANT_TERMINAL')
		? Number(env.get('TPV_DS_MERCHANT_TERMINAL'))
		: null,
	CURRENCY: env.get('TPV_DS_MERCHANT_CURRENCY')
		? Number(env.get('TPV_DS_MERCHANT_CURRENCY'))
		: null,
	TRANSACTIONTYPE: env.get('TPV_DS_MERCHANT_TRANSACTIONTYPE')
		? Number(env.get('TPV_DS_MERCHANT_TRANSACTIONTYPE'))
		: null,
	SECRET: env.get('TPV_SECRET'),
	URLCALLBACK: !debugMode
		? env.get('TPV_CALLBACK')
		: env.get('TPV_CALLBACK_DEV'),
	URLCALLBACK_OK: env.get('TPV_CALLBACK_OK'),
	SIGNATURE_VERSION: env.get('TPV_SIGNATURE_VERSION'),
	URL: 'https://sis-t.redsys.es:25443/sis/realizarPago',
}

const GMAIL_CONFIG = {
	client_id: env.get('GMAIL_CLIENTID'),
	client_secret: env.get('GMAIL_CLIENTSECRET'),
	refresh_token: env.get('GMAIL_REFRESHTOKEN'),
	auth_code: env.get('GMAIL_AUTHCODE'),
}

module.exports = {
	PORT,
	MONGO_DB_URI,
	apiLimiter,
	debugMode,
	QR_CONTAINER,
	CRYPTO_QR,
	EMAIL,
	EMAIL_PASS,
	TPV,
	GMAIL_CONFIG,
}
