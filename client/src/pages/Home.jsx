import React from 'react'
//imaporting all components
import MainBanner from '../components/MainBanner'
import Categories from '../components/Categories'
import BestSeller from '../components/BestSeller'
import BottomBanner from '../components/BottomBanner'
import NewsLetter from '../components/NewsLetter'

const Home = () => {
  return (
    <div className='mt-10'>
      {/* my banner component */}
      <MainBanner/>
        {/* categories  component */}
      <Categories/>
       {/* best seller  component */}
      <BestSeller/>
       {/* bottom bannet  component */}
      <BottomBanner/>
       {/* news letter  component */}
     <NewsLetter/>
     
    </div>
  )
}

export default Home
