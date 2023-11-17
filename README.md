# LA MASIA

Un pirata hace lo que puede.

The application is divided into two parts: the front-end, built with React, and the back-end, built with Node.js and MongoDB.

## Installation and Configuration

### Clone code

Clone this repository on your computer.

```bash
git clone https://github.com/alexsanor13/lamasia.git
```

### Front-end

To use the front-end of the application, follow these steps:

1. Navigate to the lamasia/frontend folder.

```bash
cd lamasia/frontend
```

2. Install the dependencies.

```bash
npm install
```

3.Start the application

```bash
npm run start
```

The application will run in your browser at http://localhost:3000.

### Back-end

1. Navigate to the lamasia/backend folder.

```bash
cd lamasia/backend
```

2. Install the dependencies.

```bash
npm install
```

3. Start the application

```bash
npm run start
```

## File structure

```bash
lamasia/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   ├── index.js
│   │   └── ...
│   ├── package.json
│   └── ...
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── app.js
│   ├── server.js
│   └── package.json
│
├── README.md
│
└── images/
```

## Prettier extension

```javascript
{
	"prettier.enable": true,
	"prettier.semi": false,
	"prettier.useTabs": true,
	"editor.defaultFormatter": "esbenp.prettier-vscode",
	"[html]": {
		"editor.defaultFormatter": "esbenp.prettier-vscode"
	},
	"[css]": {
		"editor.defaultFormatter": "esbenp.prettier-vscode"
	},
	"prettier.singleQuote": true
}
```
