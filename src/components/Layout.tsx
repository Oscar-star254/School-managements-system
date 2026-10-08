import { Outlet, useLocation } from 'react-router'
import { useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import WhatsApp from './WhatsApp'

export default function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])

  return (
    <div className="min-h-screen bg-[#FAFAFF] dark:bg-[#0D0920] text-gray-900 dark:text-white">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <WhatsApp />
    </div>
  )
}
