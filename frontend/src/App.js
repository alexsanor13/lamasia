import './App.css'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Header from './components/Header'
// import Footer from './components/Footer'
import Events from './pages/Events'
// import About from './pages/About'
// import Blog from './pages/Blog'

const App = () => {
	const [currentPage, setPage] = useState(window.location.href)
	const title = 'La Masia Events'

	useEffect(() => {
		document.title = title
		let docs = []
		docs = docs.concat(document.getElementById('home-page'))
		docs = docs.concat(document.getElementById('about-page'))
		docs = docs.concat(document.getElementById('events-page'))
		docs = docs.concat(document.getElementById('blog-page'))
		docs.forEach((e) => {
			if (e) {
				let path = e.getAttribute('href')
				let actual = window.location.href.split('/')
				if (path === '/' + actual[actual.length - 1]) {
					e.style.color = '#f6a53b'
				} else {
					e.style.color = '#ffffff'
				}
			}
		})
	}, [currentPage, title])

	const handlePage = (page) => {
		try {
			setPage(page)
		} catch (err) {
			console.error(err)
		}
	}

	console.log('App rendered')

	return (
		<Router>
			<div className="App">
				<Header handlePage={handlePage} />
				<main>
					<Routes>
						<Route path="/" element={<Home handlePage={handlePage} />} index />
						<Route
							path="/events"
							element={<Events handlePage={handlePage} />}
						/>
						{/* <Route
							path="/about"
							render={() => <About handlePage={handlePage} />}
						/>
						<Route
							path="/blog"
							render={() => <Blog handlePage={handlePage} />}
						/> */}
					</Routes>
				</main>
				{/* <Footer /> */}
			</div>
		</Router>
	)
}

export default App
