import Head from 'next/head'
import '../styles/globals.css'
import '../styles/custom.css'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

export default function MyApp({ Component, pageProps }) {
  return (
    <div className="min-h-screen flex">
      <Head>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="container py-12">
          <Component {...pageProps} />
        </main>
      </div>
    </div>
  )
}
