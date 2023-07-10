import React from 'react'
import './index.scss'

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <>
      <main className="">
        <h1>hello</h1>
        {children}
      </main>
    </>
  )
}
