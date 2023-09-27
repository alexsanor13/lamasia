const nodemailer = require('nodemailer')

const { EMAIL } = require('../config.js')
const { readQRImage, readQRImageFile } = require('../qrManager/readQRImage.js')
const { deleteQRFile } = require('../qrManager/qrCreator.js')
const { throwErrors } = require('../middleware/throwErrors')

async function generateEmailHTML(eventName, orderId, tickets) {
	try {
		const qrListPromises = tickets.map(async ({ ticket, qr }) => {
			const qrImage = await readQRImage(qr.qrName)
			return `
			<div class="order-details">
			  <p>ID: ${ticket.id}</p>
			  <p>Tipo: ${ticket.packTicket ? 'PACK' : 'NORMAL'}</p>
			  <div class="qr-code">
				<img src="data:image/png;base64,${qrImage}" alt="QR Code" />
			  </div>
			</div>
		  `
		})

		const qrListHTML = await Promise.all(qrListPromises)

		const emailHTML = `
		  <html>
			<head>
				<style>
					body {
						padding: 1em;
					}
					.email-header {
						text-align: center;
						background-color: #f0f0f0;
						padding: 1em;
					}
					.order-details {
						margin-bottom: 1em;
						border: 1px solid #ccc;
						padding: 1em;
					}
					.qr-code {
						text-align: center;
						margin-top: 1em;
					}
				</style>
  			</head>
			<body style="padding: 1em;">
			  <div class="email-header">
				<h1>Evento ${eventName}</h1>
		  	  </div>
			  <div class="order-details">
			  	<p>ID del Pedido: ${orderId}</p>
			  	<h2>Tus Entradas:</h2>
			  	${qrListHTML.join('')}
			  </div>
			  <br>
			</body>
		  </html>
		`

		return emailHTML
	} catch (e) {
		throwErrors(`Error creating html:${e}`, `generateEmailHTML`)
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
		throwErrors(`Error getting the qr attachment: ${e}`, `getAttachments`)
	}
}

async function sendEmailByGmail(to, tickets, eventName, orderId) {
	try {
		const htmlContent = await generateEmailHTML(eventName, orderId, tickets)

		let transporter = nodemailer.createTransport({
			host: 'smtp.gmail.com',
			port: 465,
			secure: true,
			auth: {
				user: EMAIL.user,
				pass: EMAIL.appPassword,
			},
		})

		const attachments = await getAttachments(tickets)

		const mailOptions = {
			from: `"La Masia Events 🏴‍☠️" <${EMAIL.user}>`,
			to: to,
			subject: `Tus entradas para ${eventName} ✔️`,
			html: htmlContent,
			attachments: attachments,
		}

		transporter.sendMail(mailOptions, function (error, info) {
			if (error) {
				throwErrors(`Email was not sent:${error}`, `sendEmailByGmail`)
			} else {
				console.log('Email sent: ' + info.response)
				attachments.forEach(({ filename, content }) => {
					deleteQRFile(filename)
				})
			}
		})
	} catch (e) {
		throwErrors(`Email was not sent:${e}`, `sendEmailByGmail`)
	}
}

module.exports = {
	sendEmailByGmail,
}
