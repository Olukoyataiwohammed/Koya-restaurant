import React from 'react'
import "./koya.css"
import firstImage from "./assets/koyaDrawSoup.jpg"

const Navs = () => {
  return (
    <div id='mainHome'>
        <div className='firstRoleHome'>
                <p><b><i>KO<span style={{color:"red"}}>Y</span>A_<span style={{color:"red"}}>DISHES</span></i></b></p>
                <img src={firstImage} alt='' />
         </div>   
    </div>
  )
}

export default Navs;