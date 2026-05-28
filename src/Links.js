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
import CreateReservation from './CreateReservation'
import AboutUs from './AboutUs'
import { CartProvider } from './CartContext'

 
const Links = () => {
  return (
    <BrowserRouter>
    <div className='app-container'>
    <AuthProvider>
      <CartProvider>
        <div className='fixed-ui'>
          <Navs className="nav"/>
          <Header className="header"/>
        </div>
        <main className="page-content" >
          <Routes> 
            <Route path='/' element={<Home/>}/>
            <Route path='/menu' element={<Menu/>}/>
            <Route path='/account' element={<Account/>}/>
            <Route path='/deals' element={<Deals/>}/>
            <Route path='/orderonline' element={<OrderOnline/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/about_us' element={<AboutUs/>}/>
            <Route path="/checkout" element={<CheckoutPage/>} />
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route  element={<PrivateRoute/>}/>
            <Route path='/reservation' element={<CreateReservation/>}/>
          </Routes>
        </main>
        
        
        <Navbar/>
        <Footer/>
      </CartProvider>
    </AuthProvider>
    </div>
    </BrowserRouter>
  )
};

export default Links;