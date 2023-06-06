import './Blog.css'
import Soon from '../components/Soon'
import { useEffect } from 'react'

const Blog = () => {
	useEffect(() => {
		document.title = `La Masia - Blog`
	}, [])

	return (
		<section>
			<Soon />
		</section>
	)
}

export default Blog
