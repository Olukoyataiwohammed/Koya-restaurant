import React, { useEffect, useState } from 'react'
import MenuItemCard from './MenuItemCard';
import { fetchCategories, fetchMenuItems,API_BASE_URL } from './MenuApi';
import { useNavigate} from "react-router-dom";
import { useAuth } from './AuthContext';
import "./koya.css"


const Menu = () => {
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  const { authTokens} = useAuth();


  // effect1: load all categories once the component mount
  useEffect(()=>{
    const getMenu = async ()=> {
      
      try {
        const categoryNames = await fetchCategories();
        setCategories(categoryNames);
        console.log('categories:',categoryNames)
        if (categoryNames.length > 0){
          //setSelectedCategory(categoryNames[0].id);
        }
       
      }
      catch (err) {
        setError(err.message);
        
      }
    };

    getMenu();
  }, []); 

  useEffect(()=>{
    if(!selectedCategory) return; 

    const loadMenuItems = async ()=>{
      

      setIsLoading(true);
      
      try {
        const items = await fetchMenuItems( selectedCategory);
        setMenuItems(items);
        
        console.log("showing menu Items:",items);
        
        
      }
      catch (err) {
        setError("Failed to load menu items for" + selectedCategory);
      }
      finally {
        setIsLoading(false);
      }
    };

    loadMenuItems();
  }, [ selectedCategory]);


  
  useEffect(() => {
    if (!selectedCategory) return;
    if (menuItems.length === 0) return; 

    const section = document.getElementById("items_section");
    
   
    setTimeout(() => {
      if (section) section.scrollIntoView({ behavior: "smooth" });
    }, 150);
  }, [selectedCategory, menuItems]);


  
   if (isLoading) return <div>Loading....</div>;
   if (error) return <div>Error: {error}</div>;

  
  const handleButtonClick = (categoryName) =>{
    console.log("category clicked, setting Id to:", categoryName, typeof categoryName)

    setSelectedCategory(categoryName);

    navigate(`/menu?category=${categoryName}`, { replace: true });
  }

  const filterMenuItems = menuItems.filter(item =>
    Number(item.category) === Number(selectedCategory)
    
  );

   

  

  

  return (
    <div id='restaurant_menu_container'>
        <h1>Restaurant Menu</h1>
        <div id='category_display'>
          {categories.map(category =>{
            const relativeImagePath = category.image;

            const FullImageUrl = `${API_BASE_URL}${relativeImagePath}`
            return(
              <button key={category.id} onClick={()=> handleButtonClick(category.id)}
                className={selectedCategory === category.id ? 'active' : ''}
              >
                <img src={FullImageUrl} alt={category.name} /> <br/>
                <span>{category.name}</span>

              </button>
              
            )
          })}
        </div>
         <div id="items_section"></div>
         <div id='display_items'>
          
          {filterMenuItems.map(item => (
            <MenuItemCard key={item.id} item={item} baseUrl={API_BASE_URL} authToken={authTokens}/>
            
          ))}
          
        </div>
        <div>
          
          <p>ALL THIS DISHES ARE SUPERB</p>
        </div>
    </div>
  )

}


export default Menu;