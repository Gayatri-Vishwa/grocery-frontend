import React from 'react'
import Hero from '../components/Hero'
import Category from '../components/Category'
import BestSeller from '../components/BestSeller'
import NewsLetter from '../components/NewsLetter'

function Home() {
  return (
    <div className='mt-10'>
        {/* <h1 className='text-5xl'>home page</h1> */}
      <Hero/>
      <Category/>
      <BestSeller/>
      <NewsLetter/>
    </div>
  )
}

export default Home
