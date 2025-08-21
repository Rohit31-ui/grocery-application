import React from 'react'
import ProductCard from './ProductCard'
import { useAppContext } from '../context/AppContext'

const BestSeller = () => {
  //get products data from context
  const {products}=useAppContext();
  return (
    <div className='mt-16'>
        <p className='text-2xl md:text-3xl font-medium'>Best Sellers</p>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6'>
          {/* show top 5 products using slice from productList */}
          {products.filter((product)=> product.inStock).slice(0,5).map((product,index)=>(
              // function to create card
              <ProductCard  product={product} key={index}/>
          ))}
        </div>
    </div>
  )
}

export default BestSeller
