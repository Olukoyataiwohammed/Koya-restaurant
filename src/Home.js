import React, { useEffect, useState } from 'react'
import "./koya.css"
import homePageImageOne  from './assets/restaurantSuyas.jpg'
import homePageImageFour from "./assets/restaurantWallpaper.jpeg"
import homePageImageThree from "./assets/restaurantIngrdentSauce.webp"
import homePageImageTwo from "./assets/restaurant_suya.jpg"
import dinningTable from "./assets/restaurantDining.webp"






const Home = () => {
  const images = [homePageImageOne,homePageImageTwo,homePageImageThree,homePageImageFour];
  
    const [currentImageIndex,setCurrentImageIndex] = useState(0);
  
    useEffect(()=>{
      const interval = setInterval(()=>{
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      },5000); // change every 5 sconds...
  
      return ()=> clearInterval(interval); // cleanup onmount
    }, [images.length]);
  
    const dynamicBackgrounds = {
        backgroundImage: `url(${images[currentImageIndex]})`,
        backgroundSize: "cover",
        transition: 'background-image 1s ease-in-out', // optional : for smooth transitions
        height: "60vh"
        
    }
  
  return (
    <div id='mainHome'>
      
      <main id='homePageImage' style={dynamicBackgrounds}>
          <p id='pageRole'>We have different varieties of food in KOYA_DISHES</p>
      </main>

      <p>
        <img className='dinningTable' src={dinningTable} alt=''/>
      </p>
      
    </div>
  )
}

export default Home;