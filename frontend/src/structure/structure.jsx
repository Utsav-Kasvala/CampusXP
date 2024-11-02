import React from 'react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import Routers from '../routes/Routers'
const Structure = () => {
  return (
    <>
    <div className="min-h-screen flex flex-col">
    <Header/>
    <main>
        <Routers/>
    </main>
    <Footer/>
    </div>
    

    </>
  )
}

export default Structure