const nodemailer = require('nodemailer')
const fs = require('fs')
const { EMAIL, EMAIL_PASS } = require('../config.js')
const { readQRImage } = require('../qrManager/readQRImage.js')

const transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user: EMAIL,
		pass: EMAIL_PASS,
	},
})

async function generateEmailHTML(eventName, orderId, tickets) {
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
}

async function sendMailWithQR(to, tickets, eventName, orderId) {
	try {
		const htmlContent = await generateEmailHTML(eventName, orderId, tickets)

		const mailOptions = {
			from: EMAIL,
			to: to,
			subject: `LA MASIA ${eventName}`,
			html: htmlContent,
		}

		// TODO HACER QUE FUNCIONE EL ENVÍO DE MAILS
		const info = transporter.sendMail(mailOptions)
		console.log('Email sent:', info.response)
	} catch (error) {
		console.error('Error sending email:', error)
	}
}

module.exports = {
	sendMailWithQR,
}
