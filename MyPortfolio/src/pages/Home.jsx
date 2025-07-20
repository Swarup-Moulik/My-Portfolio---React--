import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Skills from '../components/Skills'
import Project from '../components/Project'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import { useParams } from 'react-router-dom'
import { PortfolioContext } from '../context/PortfolioContext'

const Home = () => {
  const { user: userIdFromURL } = useParams();
  const { getPortfolio, loading, portfolio } = useContext(PortfolioContext);
  useEffect(() => {
    if (userIdFromURL) {
      getPortfolio(userIdFromURL); // ⬅️ pass user ID from the URL
    }
  }, [userIdFromURL]);
  if (loading || !portfolio) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="animate-pulse text-lg text-muted">Loading portfolio...</p>
      </div>
    )
  }
  return (
    <div className='min-h-screen bg-background text-foreground overflow-x-hidden '>
      {/* ---Navbar--- */}
      <Navbar />
      {/* ---Main Section--- */}
      <main>
        <Hero />
        <About />
        <Skills />
        <Project />
        <Contact />
      </main>
      {/* ---Footer--- */}
      <Footer />
    </div>
  )
}

export default Home
