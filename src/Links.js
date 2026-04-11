import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Home'
import Header from './Header'
import Menu from './Menu'
import Deals from './Deals'
import OrderOnline from './OrderOnline' 
import Cart from './Cart'
import Footer from './Footer'
import Navs from './Nav'
import Account from './Account'
import PrivateRoute from './PrivateRoute'
import { AuthProvider } from './AuthContext'
import Navbar from './Navbar'
import Login from './Login'
import CheckoutPage from "./CheckoutPage";
import Signup from './Signup'
import { CartProvider } from './CartContext'
 
const Links = () => {
  return (
    <BrowserRouter>
    <AuthProvider>
      <CartProvider>
        <Navs/>
        <Header/>
        <Routes> 
            <Route path='/' element={<Home/>}/>
            <Route path='/menu' element={<Menu/>}/>
            <Route path='/account' element={<Account/>}/>
            <Route path='/deals' element={<Deals/>}/>
            <Route path='/orderonline' element={<OrderOnline/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path="/checkout" element={<CheckoutPage/>} />
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route  element={<PrivateRoute/>}/>
        </Routes>
        <Navbar/>
        <Footer/>
      </CartProvider>
    </AuthProvider>
    </BrowserRouter>
  )
};

export default Links;