import { lazy } from 'react'

const About = lazy(() => import('@pages/About'))
const Blog = lazy(() => import('@pages/Blog'))
const EventDetail = lazy(() => import('@pages/EventDetail'))
const Events = lazy(() => import('@pages/Events'))
const PaymentSuccessful = lazy(() => import('@pages/PaymentSuccessful'))
const PrivacyPolicy = lazy(() => import('@pages/PrivacyPolicy'))
const QRScannerPage = lazy(() => import('@pages/QRScannerPage'))
const TermsOfUse = lazy(() => import('@pages/TermsOfUse'))

export const routes = [
	{ path: '/', element: <Events /> },
	{ path: '/events/:id', element: <EventDetail /> },
	{ path: '/about', element: <About /> },
	{ path: '/blog', element: <Blog /> },
	{ path: '/scanner', element: <QRScannerPage /> },
	{ path: '/paymentsuccessful/:order', element: <PaymentSuccessful /> },
	{ path: '/termsofuse', element: <TermsOfUse /> },
	{ path: '/privacy', element: <PrivacyPolicy /> },
]
