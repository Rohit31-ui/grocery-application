import React from "react";
import { useState, createContext, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {dummyProducts} from "../assets/assets"
import toast from 'react-hot-toast';
import axios from "axios";


axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
export const AppContext = createContext();



export const AppContextProvider = ({ children }) => {
  
  const currency = import.meta.env.VITE_CURRENCY;//currency for price show
  const navigate = useNavigate();//useNavigate to smoothly navigate user from react router dom
  //state to check user is loggedin or not
  const [user, setUser] = useState(null);
  //state to check the user is seller or not
  const [isSeller, setIsSeller] = useState(false);
  //state to handle show login popup
  const [showUserLogin, setShowUserLogin]= useState(false);
  //state to handle products
  const [products, setProducts]= useState([]);
  //state to handle search query
 const [searchQuery, setSearchQuery]= useState({});
 //state to handle cart items
 const [cartItems, setCartItems]= useState({});


 //function to fetch authorised sellers
  const fetchSeller =  async() => {
    try {
      const {data} = await axios.get('/api/seller/is-auth');
      if(data.success){
        setIsSeller(true);
      }else{
        setIsSeller(false);
      }

    } catch (error) {
      setIsSeller(false);
    }
  } 

  //function to fetch autorised users
   const fetchUser = async() =>{

    try {
      const {data} = await axios.get('/api/user/is-auth');

      if(data.success){
        setUser(data.user);
        setCartItems(data.user.cartItems);
      }

    } catch (error) {
      setUser(null);
    }
  }

  //function to fetch products
 const fetchProducts = async () => {
    try {
      const {data} = await axios.get('/api/product/list');

      if(data.success){
        setProducts(data.products)
      }else{
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  };
// add product to cart

//increase count of products on click on +
const addToCart = (itemId)=>{
  let cartData = structuredClone(cartItems);
  if(cartData[itemId]){
    cartData[itemId] +=1;
  } else {
    cartData[itemId]=1;
  }
  setCartItems(cartData);
  toast.success("Added To Cart")
};

// update cart item quantity
const updateCartItem = (itemId,quantity)=>{
     let cartData = structuredClone(cartItems);
     cartData[itemId] = quantity;
     setCartItems(cartData)
     toast.success("Cart Updated")
};
 
// remove product from cart

//decrease count of products on click on +
const removeFromCart = (itemId) => {
  let cartData = structuredClone(cartItems);
  if(cartData[itemId]){
    cartData[itemId] -= 1;
    if(cartData[itemId] === 0){
      delete cartData[itemId];
        toast.success("Removed From Cart");
    }
  }
  
    setCartItems(cartData);
  
};

     // get cart item count
     const getCartCount = ()=>{
      let totalCount = 0;
      for(const item in cartItems){
        totalCount+=cartItems[item];
      }
      return totalCount;
     }
   
     // get cart total amount 
         
       const getCartAmount=()=>{
        let totalAmount = 0;
          for(const items in cartItems){
        let itemInfo = products.find((product)=>product._id===items);
        if(cartItems[items] >0 ){
          totalAmount+=itemInfo.offerPrice * cartItems[items]
        }
         }
         return Math.floor(totalAmount *100)/100;
       }


   useEffect(()=>{
     fetchProducts();
    fetchSeller();
    fetchUser();
   },[]);

   //to update cart real time
    useEffect(()=> {
    const updateCart = async () => {
      try {
        const {data} = await axios.post('/api/cart/update', {cartItems});

        if(!data.success){
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }

    if(user){
      updateCart();
    }
  })
//pass all gloabl states to value
  const value = { navigate, user, setUser, setIsSeller, isSeller,showUserLogin, setShowUserLogin,products,currency,addToCart,updateCartItem,removeFromCart,cartItems,searchQuery,setSearchQuery,getCartAmount,getCartCount,axios,fetchProducts,setCartItems};

  return (
    
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
