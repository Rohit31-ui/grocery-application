import React from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
const ProductCard = ({ product }) => {
  //global states from context
  const { currency, addToCart, removeFromCart, cartItems, navigate,setShowUserLogin,user } = useAppContext();


   // check login before cart actions
    const requireLogin = (action) => {
    if (!user) {
      toast.error("Please login first!");
      setShowUserLogin(true);
      return false;
    }
    action(); 
  };


  return product && (
    //onclick navigate to individual product
    <div onClick={()=>{navigate(`/products/${product.category.toLowerCase()}/${product._id}`); scrollTo(0,0)}} className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white min-w-56 max-w-56 w-full">
      <div className="group cursor-pointer flex items-center justify-center px-2">
        {/* product image */}
        <img className="group-hover:scale-105 transition max-w-26 md:max-w-36" src={product.image[0]} alt={product.name} />
      </div>
      <div className="text-gray-500/60 text-sm">
        {/* product category */}
        <p>{product.category}</p>
        {/* product name */}
        <p className="text-gray-700 font-medium text-lg truncate w-full">{product.name}</p>
        {/* product rating stars */}
        <div className="flex items-center gap-0.5">
          {Array(5).fill('').map((_, i) => (
            <img key={i} className="md:w-3.5 w3" src={i < 4 ? assets.star_icon : assets.star_dull_icon} alt="" />
          ))}
          <p>({4})</p>
        </div>
        <div className="flex items-end justify-between mt-3">
          <p className="md:text-xl text-base font-medium text-primary">
            {/* price display with currency */}
            {currency}{product.offerPrice}{" "}
            {/* price to show the discount */}
            <span className="text-gray-500/60 md:text-sm text-xs line-through">
              {currency}{product.price}
            </span>
          </p>
          <div  onClick={(e)=>{e.stopPropagation();}}className="text-primary">
            {/* uptil cart is empty show add button else show count of items */}
            {!cartItems[product._id] ? (
              <button
                className="flex items-center justify-center gap-1 bg-primary/10 border border-primary/40 md:w-[80px] w-[64px] h-[34px] rounded text-primary font-medium cursor-pointer"
                onClick={() => requireLogin(() => addToCart(product._id))}
              >
                <img src={assets.cart_icon} alt="cart_icon" />
                Add
              </button>
            ) : (
              <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-primary/25 rounded select-none">
                <button onClick={() =>{removeFromCart(product._id)}} className="cursor-pointer text-md px-2 h-full">
                  -
                </button>
                <span className="w-5 text-center">{cartItems[product._id]}</span>
                <button onClick={() =>{addToCart(product._id)}} className="cursor-pointer text-md px-2 h-full">
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
