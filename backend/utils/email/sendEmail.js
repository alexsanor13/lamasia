const nodemailer = require('nodemailer')

const { EMAIL, EMAIL_PASS, GMAIL_CONFIG } = require('../config.js')
const { readQRImage } = require('../qrManager/readQRImage.js')

async function generateEmailHTML(eventName, orderId, tickets) {
	try {
		const qrListPromises = tickets.map(async ({ ticket, qr }) => {
			const qrImage = await readQRImage(qr.qrName)
			return `
			<div>
			  <p>Ticket ID: ${ticket.id}</p>
			  <p>Tipo de Ticket: ${ticket.packTicket ? 'PACK' : 'NORMAL'}</p>
			  <img src="data:image/png;base64,${qrImage}" alt="QR Code" />
			</div>
		  `
		})

		const qrListHTML = await Promise.all(qrListPromises)

		const emailHTML = `
		  <html>
			<body>
			  <h1>Evento: ${eventName}</h1>
			  <p>ID del Pedido: ${orderId}</p>
			  <h2>Tus Entradas:</h2>
			  ${qrListHTML.join('')}
			</body>
		  </html>
		`

		return emailHTML
	} catch (e) {
		throw new Error(`Error creating html:${e}`)
	}
}

async function sendEmailByGmail(to, tickets, eventName, orderId) {
	try {
		const htmlContent = await generateEmailHTML(eventName, orderId, tickets)

		let transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				type: 'OAuth2',
				user: EMAIL,
				pass: EMAIL_PASS,
				clientId: GMAIL_CONFIG.client_id,
				clientSecret: GMAIL_CONFIG.client_secret,
				refreshToken: GMAIL_CONFIG.refresh_token,
			},
		})
		const mailOptions = {
			from: EMAIL,
			to: to,
			subject: `LA MASIA ${eventName}`,
			html: htmlContent,
		}

		transporter.sendMail(mailOptions, function (error, info) {
			if (error) {
				console.error(error)
				throw new Error(error)
			} else {
				console.log('Email sent: ' + info.response)
			}
		})
	} catch (e) {
		throw new Error(`Email was not sent:${e}`)
	}
}

module.exports = {
	sendEmailByGmail,
}
