import React from 'react'
import { NavLink } from 'react-router-dom'
import './koya.css'


const Header = () => {
    const navLinkDisplay = ({isActive}) =>{
        return ({
            border : isActive ? "":" ",
            borderBottom: isActive ? " dotted 5px black": " ",
            color: isActive? "black": " ",
            backgroundColor: isActive?" " : " ",
            fontStyle: "italic",
            fontSize: "30px",
            //width: isActive? "300px" : " ",
            textAlign: isActive ? "center" : " "
        })
        
       
    }
  return (
    <header id='Header'>
        <NavLink className='head head1' style={navLinkDisplay} to='/'>Home</NavLink>
        <NavLink className='head1' style={navLinkDisplay} to='/menu'>Menu</NavLink>
        <NavLink className='head1' style={navLinkDisplay} to='/deals'>Deals</NavLink>
        <NavLink className='head1' style={navLinkDisplay} to='/about_us'>About Us</NavLink>
        <NavLink className='head1' style={navLinkDisplay} to='/orderonline'>Order Online</NavLink>
        <NavLink className='head1' style={navLinkDisplay} to='/account'>👨‍👩‍👧‍👦</NavLink>
        <NavLink className='head1' style={navLinkDisplay} to='/cart'>🛒</NavLink>
        
    </header>
  )
}

export default Header;