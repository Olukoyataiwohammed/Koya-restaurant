import React from 'react'
import Links from './Links'
import { AuthProvider } from './AuthContext';
import { CartProvider } from './CartContext';


const App = () => {
  return (
  <AuthProvider>
    <CartProvider>
      <Links />
    </CartProvider>
  </AuthProvider>
  )
}

export default App;