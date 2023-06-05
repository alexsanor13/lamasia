require('dotenv').config()
// Env https://humanwhocodes.com/blog/2021/02/introducing-env-javascript-environment-variables/#fn:1
const { Env } = require('@humanwhocodes/env')
const env = new Env()

const PORT = env.first(['PORT', 'HTTP_PORT'], 8080)
const MONGO_DB_URI = env.get('MONGO_DB_URI')
const NODE_ENV = env.get('NODE_ENV')
const SECRET = env.get('SECRET')
const DEBUG_MODE = env.get('DEBUG_MODE')
const QR_CONTAINER = env.get('QR_CONTAINER')
const CRYPT_QR = env.get('CRYPT_QR')

const rateLimit = require('express-rate-limit')

const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // limit each IP to 100 requests per windowMs
	message: 'Too many requests from this IP, please try again later',
})

let debugMode = false
if (process.argv.includes('--mode=debug') || DEBUG_MODE) {
	debugMode = true
}

module.exports = {
	PORT,
	MONGO_DB_URI,
	NODE_ENV,
	SECRET,
	apiLimiter,
	debugMode,
	QR_CONTAINER,
	CRYPT_QR,
}
