const generateQRScanHTML = ({
	transactionId,
	email,
	eventName,
	isPack,
	activated,
}) => {
	const message = !activated
		? `
    <h1 class='correctQR'>¡Código QR escaneado exitosamente!</h1>
    <p>TRANSACTION ID: ${transactionId}</p>
    <p>EMAIL: ${email}</p>
    <p>EVENTO: ${eventName}</p>
    <p>TIPO DE ENTRADA: ${isPack ? 'PACK' : 'NORMAL'}</p>
    <button id="closeButton">Cerrar</button>
    `
		: `
    <h1 class='badQR'>El código ya ha sido escaneado previamente</h1>
    <button id="closeButton">Cerrar</button>
    `
	return {
		html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Resultado del escaneo de QR</title>
      <style>
        body {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          font-family: Arial, sans-serif;
        }

        .message {
          text-align: center;
          padding: 20px;
          background-color: #f2f2f2;
          border-radius: 5px;
        }

        .correctQR {
          color: green;
        }

        .badQR {
          color: red;
        }

        #closeButton {
          margin-top: 20px;
          cursor: pointer;
          color: blue;
          text-decoration: underline;
        }
      </style>
    </head>
    <body>
      <div class="message">
        ${message}
      </div>
      <script>
        document.getElementById('closeButton').addEventListener('click', () => {
          window.close(); // Cierra la ventana actual
        });
      </script>
    </body>
    </html>
  `,
		qrStatus: !activated
			? `OK! Entrada ${
					isPack ? 'PACK' : 'NORMAL'
			  } para ${eventName} validada exitosamente.`
			: `ERROR. La entrada ya está validada`,
	}
}

module.exports = {
	generateQRScanHTML,
}
