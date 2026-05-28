import React from 'react'
import { useAuth } from './AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import "./koya.css"


const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();
    const {clearCart} = useCart();
    const navigate = useNavigate();

    const handleLogout = () =>{
        clearCart();
        logout(); // call the logout function from AuthContext
        navigate('/');
    };
  return (
    <nav className='main_nav_bar'>
        <Link to='/' className='nav_bar' >Home</Link>
        {isAuthenticated ? (
            <>
                <Link to="/menu">Menu</Link>
                <button onClick={handleLogout}>
                    Logout
                </button>
            </>
        ) :(
            <>
                <Link to="/account" className='nav_bar' >Account</Link>
                
            </>
        )}
    </nav>
  );
};

export default Navbar;