import React, { useState } from 'react';
import "./koya.css";

import { useCart } from './CartContext';

const MenuItemsCard = ({ item, baseUrl }) => {
  const { addItemToCart } = useCart();
  const [message, setMessage] = useState("");

  const handleToCart = async () => {
    await addItemToCart(item.id, 1);
    setMessage("Added to cart successfully!");
    setTimeout(() => setMessage(""), 2000);
  };
  

  const FullImageUrl = `${baseUrl}${item.image}`;

  return (
    <div className='menu_item_card'>
      <img src={FullImageUrl} alt={item.name} className='menu_item_image' />
      <div className='menu_item_details'>
        <div className='menu_item_header'>
          <h3 className='menu_item_title'>{item.name}</h3>
          <span className='menu_item_price'>&#8358;{Number(item.price).toFixed(2)}</span>
        </div>
        <p className='menu_item_description'>{item.description}</p>
        <button onClick={handleToCart}>Add To Cart</button>
        {message && <p style={{ color: "gold" }}>{message}</p>}
      </div>
    </div>
  );
};



export default MenuItemsCard;
