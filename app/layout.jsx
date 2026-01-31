import './globals.css'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

export const metadata = {
  title: 'NextDocs',
  description: 'Documentation portal'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex">
          <Sidebar />
          <div className="flex-1">
            <Header />
            <main className="container py-8">{children}</main>
          </div>
        </div>
      </body>
    </html>
  )
}
