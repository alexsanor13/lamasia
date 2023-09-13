const nodemailer = require('nodemailer')

const { EMAIL, EMAIL_PASS, GMAIL_CONFIG } = require('../config.js')
const { readQRImage, readQRImageFile } = require('../qrManager/readQRImage.js')
const { deleteQRFile } = require('../qrManager/qrCreator.js')
const { throwErrors } = require('../middleware/throwErrors')

async function generateEmailHTML(eventName, orderId, tickets) {
	try {
		const qrListPromises = tickets.map(async ({ ticket, qr }) => {
			const qrImage = await readQRImage(qr.qrName)
			return `
			<div style="margin-bottom: 1em;">
			  <p>Ticket ID: ${ticket.id}</p>
			  <p>Tipo de Ticket: ${ticket.packTicket ? 'PACK' : 'NORMAL'}</p>
			  <img src="data:image/png;base64,${qrImage}" alt="QR Code" />
			</div>
			<hr>
		  `
		})

		const qrListHTML = await Promise.all(qrListPromises)

		const emailHTML = `
		  <html>
			<body style="padding: 1em;">
			  <h1>Evento ${eventName}</h1>
			  <p>ID del Pedido: ${orderId}</p>
			  <h2>Tus Entradas:</h2>
			  ${qrListHTML.join('')}
			</body>
			<br>
			<hr>
		  </html>
		`

		return emailHTML
	} catch (e) {
		throwErrors(`Error creating html:${e}`)
	}
}

const getAttachments = async (tickets) => {
	try {
		const attachments = []

		for (const { _ticket, qr } of tickets) {
			const qrImageBuffer = await readQRImageFile(qr.qrName)

			attachments.push({
				filename: `${qr.qrName}.png`,
				content: qrImageBuffer,
			})
		}
		return attachments
	} catch (e) {
		throwErrors(`Error getting the qr attachment: ${e}`)
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
		const attachments = await getAttachments(tickets)

		const mailOptions = {
			from: EMAIL,
			to: to,
			subject: `LA MASIA ${eventName}`,
			html: htmlContent,
			attachments: attachments,
		}

		transporter.sendMail(mailOptions, function (error, info) {
			if (error) {
				console.error(error)
				throw new Error(error)
			} else {
				console.log('Email sent: ' + info.response)
				attachments.forEach(({ filename, content }) => {
					deleteQRFile(filename)
				})
			}
		})
	} catch (e) {
		throwErrors(`Email was not sent:${e}`)
	}
}

module.exports = {
	sendEmailByGmail,
}
