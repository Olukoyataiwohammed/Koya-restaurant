import { useCart } from "./CartContext";

import CheckoutButton from "./CheckoutButton";




const Cart = () => {
  const { cart, loading, removeFromCart } = useCart();

  console.log("CART STATE IN UI:", cart);
  console.log("cart.total_price type:", typeof cart.total_price, cart.total_price);


  if (loading) return <p>Loading...</p>;
  if (!cart || !cart.items || cart.items.length === 0){
      return <p>Restaurant Cart is empty</p>;
  } 

  return (
    <div>
    <h2>Restaurant Cart</h2>
    {cart.items.map((cartItem) => (
      <div key={cartItem.id}>
        <p>{cartItem.item?.name}</p>
        <p>Qty: {cartItem.quantity}</p>
        <p>₦{Number(cartItem.item?.price).toFixed(2)}</p>
        <button onClick={() => removeFromCart(cartItem.id)}>Remove</button>
      </div>
    ))}
    <h3>Total: ₦{Number(cart.total_price || 0).toFixed(2)}</h3>

    {/* Only show guest form when checkout is clicked */}
    <CheckoutButton showGuestFormInline={false} />
  </div>

  );
};

export default Cart;
