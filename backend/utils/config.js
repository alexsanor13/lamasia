require('dotenv').config()
// Env https://humanwhocodes.com/blog/2021/02/introducing-env-javascript-environment-variables/#fn:1
const { Env } = require('@humanwhocodes/env')
const env = new Env()

const debugMode = process.argv.includes('--mode=debug')

const PORT = env.first(['PORT', 'HTTP_PORT'], 8080)
const MONGO_DB_URI = debugMode
	? env.get('MONGO_DB_URI')
	: env.get('MONGO_DB_URI_PROD')

const CRYPTO_QR = env.get('CRYPTO_QR')

const rateLimit = require('express-rate-limit')

const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 1200, // limit each IP to 100 requests per windowMs
	message: 'Too many requests from this IP, please try again later',
})

const QR_CONTAINER = env.get('QR_CONTAINER')

const EMAIL = {
	user: env.get('EMAIL'),
	password: env.get('EMAIL_PASS'),
	appPassword: env.get('EMAIL_APP_PASSWORD'),
}

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
	SECRET: [env.get('TPV_SECRET_PROD'), env.get('TPV_SECRET')][++debugMode],
	URLCALLBACK: !debugMode
		? env.get('TPV_CALLBACK')
		: env.get('TPV_CALLBACK_DEV'),
	URLCALLBACK_OK: env.get('TPV_CALLBACK_OK'),
	SIGNATURE_VERSION: env.get('TPV_SIGNATURE_VERSION'),
	URL: !debugMode
		? 'https://sis.redsys.es/sis/realizarPago'
		: 'https://sis-t.redsys.es:25443/sis/realizarPago',
}

module.exports = {
	PORT,
	MONGO_DB_URI,
	apiLimiter,
	debugMode,
	QR_CONTAINER,
	CRYPTO_QR,
	EMAIL,
	TPV,
}
