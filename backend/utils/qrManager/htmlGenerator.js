const generateQRScanHTML = (message) => {
	return `
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
        </style>
      </head>
      <body>
        <div class="message">
          <h1>¡Código QR escaneado exitosamente!</h1>
          <p>${message}</p>
        </div>
      </body>
      </html>
    `
}

module.exports = {
	generateQRScanHTML,
}
