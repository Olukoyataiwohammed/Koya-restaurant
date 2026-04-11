import React, { useState } from 'react'
import Login from './Login'
import Signup from './Signup' 
import "./koya.css"
import firstImage from "./assets/koyaDrawSoup.jpg"




const Account = () => {
  const [showSignUp,setShowSignUp] = useState(false);

  const handleSubmit =()=>{
    setShowSignUp(false);
  }
  
  return (
    <div id='mainApp' >

      <div className='account_restaurant_logo'>
        <p style={{color: "white",marginTop: "10px"}}><b><i>KO<span style={{color:"red"}}>Y</span>A_<span style={{color:"red"}}>DISHES</span></i></b></p>
        <img src={firstImage} alt='' style={{width: '50px',height: "auto",border: "double thin white",borderRadius: "50px" }}/>
      </div>
      
      
      
      {showSignUp ? (<Signup onSubmitSuccess={handleSubmit} /> )
      : ( <Login onPressed={()=>setShowSignUp(true)}  />)
    }
   
    </div>
  
  
  )
}

export default Account