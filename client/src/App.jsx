import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import { useAppContext } from "./context/AppContext";
import Login from "./components/Login";
import AllProducts from "./pages/AllProducts";
import ProductCategory from "./pages/ProductCategory";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import AddAddress from "./pages/AddAddress";
import MyOrders from "./pages/MyOrders";
import SellerLogin from "./components/seller/SellerLogin";
import SellerLayout from "./pages/seller/SellerLayout";
import AddProduct from "./pages/seller/AddProduct"
import ProductList from "./pages/seller/ProductList";
import Orders from "./pages/seller/Orders";
import axios from "axios";
import Loading from "./components/Loading";
import Contact from "./pages/Contact";

const App = () => {
  axios.defaults.withCredentials = true;
  const isSellerPath = useLocation().pathname.includes("seller");
  const { showUserLogin, isSeller } = useAppContext();
  return (
    <div className="text-default min-h-screen text-gray-700 bg-white">
      {isSellerPath ? null : <Navbar />}
      {showUserLogin ? <Login /> : null}
      {/* toaster to show notifications */}
      <Toaster />

      <div
        className={`${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}`}
      >
        <Routes>
          {/* home route */}
          <Route path="/" element={<Home />} />
            {/* contact route */}
          <Route path='/contact' element={<Contact/>}/>

          {/* all products route */}
          <Route path="/products" element={<AllProducts />} />
          {/* product category route */}
          <Route path="/products/:category" element={<ProductCategory />} />
          {/* product details route */}
          <Route path="/products/:category/:id" element={<ProductDetails />} />
          {/* cart route */}
          <Route path="/cart" element={<Cart />} />
          {/* add address route */}
          <Route path="/add-address" element={<AddAddress />} />
          {/* loading route */}
          <Route path="/loader" element={<Loading />} />
          {/* myorders route */}
          <Route path="/my-orders" element={<MyOrders />} />


          {/* seller nested routes */}
          <Route
            path="/seller"
            element={isSeller ? <SellerLayout /> : <SellerLogin />}
          >
            {/* addProduct route */}
            <Route index element={isSeller ? <AddProduct /> : null} />
            {/* Productlist route */}
            <Route path="product-list" element={<ProductList />} />
            {/*orders route */}
            <Route path="orders" element={<Orders />} />
          </Route>
        </Routes>
      </div>
      
      {!isSellerPath && <Footer />}
    </div>
  );
};

export default App;
