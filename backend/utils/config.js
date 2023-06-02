require('dotenv').config()
// Env https://humanwhocodes.com/blog/2021/02/introducing-env-javascript-environment-variables/#fn:1
const { Env } = require('@humanwhocodes/env')
const env = new Env()

const PORT = env.first(['PORT', 'HTTP_PORT'], 8080)
const MONGO_DB_URI = env.get('MONGO_DB_URI')
const NODE_ENV = env.get('NODE_ENV')
const SECRET = env.get('SECRET')

const rateLimit = require('express-rate-limit')

const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // limit each IP to 100 requests per windowMs
	message: 'Too many requests from this IP, please try again later',
})

module.exports = {
	PORT,
	MONGO_DB_URI,
	NODE_ENV,
	SECRET,
	apiLimiter,
}
