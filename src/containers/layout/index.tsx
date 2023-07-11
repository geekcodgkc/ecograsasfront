import React from 'react'
import '../../styles/global.scss'
import NavBar from '../../components/nav'
import Footer from '../../components/footer'

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <>
      <NavBar />
        <main className="min-w-full bg-slate-100 min-h-screen">
          {children}
        </main>
      <Footer />
    </>
  )
}
