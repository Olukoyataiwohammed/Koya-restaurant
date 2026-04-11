// src/context/CartContext.js
import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useAuth } from "./AuthContext";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

const API_BASE_URL = "http://127.0.0.1:8000";

export const CartProvider = ({ children }) => {
  const { token } = useAuth(); 
  const [cart, setCart] = useState({ items: [], total_price: 0 });
  const [loading, setLoading] = useState(true);
  console.log("CartProvider token:", token);


  const fetchCart = useCallback(async () => {
  console.log(" fetchCart CALLED, token =", token);
  setLoading(true);
  try {
    const headers = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const res = await fetch(`${API_BASE_URL}/cart/get-items/`, {
      method: "GET",
      headers,
      credentials: "include",
    });

    const data = await res.json();
    console.log("CART DATA:", data);
    setCart(data || { items: [], total_price: 0 });


    
  } catch (err) {
    console.error("Fetch cart error", err);
    setCart({ items: [], total_price: 0 });
  } finally {
    setLoading(false);
  }
}, [token]);


  
  const addItemToCart = useCallback(
    async (menuItemId, quantity = 1) => {
      try {
        const headers = {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        };

        const res = await fetch(`${API_BASE_URL}/cart/add-items/`, {
          method: "POST",
          headers,
          credentials: "include",
          body: JSON.stringify({ item_id: menuItemId, quantity: Math.max(quantity, 1) }),
        });

        if (!res.ok) {
          console.error("Failed to add item", res.status);
          return;
        }

        
        await fetchCart();

      } catch (err) {
        console.error("Add to cart error", err);
      }
    },
    [token, fetchCart]
  );


  
  const removeFromCart = useCallback(
    async (itemId) => {
      try {
        const headers = {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        };

        const res = await fetch(`${API_BASE_URL}/cart/delete-item/${itemId}/`, {
          method: "DELETE",
          headers,
          credentials: "include",
        });

        if (!res.ok) {
          console.error("Failed to remove item", res.status);
          return;
        }

        await fetchCart();
      } catch (err) {
        console.error("Remove error", err);
      }
    },
    [token, fetchCart]
  );

  
  const clearCart = useCallback(() => {
    setCart({ items: [], total_price: 0 });
  }, []);

  
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const placeOrder = async (orderData) => {
    try {
      const headers = {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      };

      const res = await fetch(`${API_BASE_URL}/order/create/`, {
        method: "POST",
        headers,
        credentials: "include",
        body: JSON.stringify(orderData),
      });

      const data = await res.json();

      if (!res.ok) {
        return {
          success: false,
          message: data?.detail || "Order failed",
        };
    }

    // Clear cart after success
    setCart({ items: [], total_price: 0 });

      return { success: true, order: data };
    } catch (error) {
      console.error("ORDER ERROR:", error);
      return { success: false, message: "Network error" };
    }
  };


  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addItemToCart,
        fetchCart,
        setCart,
        removeFromCart,
        clearCart,
        placeOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
