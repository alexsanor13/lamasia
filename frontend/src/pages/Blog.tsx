import Soon from '../components/Soon'
import { useEffect } from 'react'

function Blog() {
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
