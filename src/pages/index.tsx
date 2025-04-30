import { useEffect, useState } from 'react'
import Head from 'next/head'

import siteConfig from '../../config/site.config'
import Navbar from '../components/Navbar'
import FileListing from '../components/FileListing'
import Footer from '../components/Footer'
import Breadcrumb from '../components/Breadcrumb'
import SwitchLayout from '../components/SwitchLayout'

export default function Home() {
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    const login = () => {
      const input = prompt('Enter username:password')
      if (!input) return

      const [user, pass] = input.split(':')
      if (user === 'admin' && pass === 'secret') {
        alert('Login successful!')
        setAuthorized(true)
      } else {
        alert('Invalid credentials')
        login() // Retry on failure
      }
    }

    login()
  }, [])

  if (!authorized) return null // Render nothing until authorized

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-gray-900">
      <Head>
        <title>{siteConfig.title}</title>
      </Head>

      <main className="flex w-full flex-1 flex-col bg-gray-50 dark:bg-gray-800">
        <Navbar />
        <div className="mx-auto w-full max-w-5xl py-4 sm:p-4">
          <nav className="mb-4 flex items-center justify-between px-4 sm:px-0 sm:pl-1">
            <Breadcrumb />
            <SwitchLayout />
          </nav>
          <FileListing />
        </div>
      </main>

      <Footer />
    </div>
  )
}
