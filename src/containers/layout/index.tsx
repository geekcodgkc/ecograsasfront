import React from 'react'
import '../../styles/global.scss'

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <>
      <main className="min-w-full bg-[#34d399]">
        <h1 className='text-3xl font-bold underline'>hello</h1>
        {children}
      </main>
    </>
  )
}
