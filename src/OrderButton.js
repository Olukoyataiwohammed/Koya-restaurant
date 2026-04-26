import { useState } from "react";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";
import usePaystack from "./UsePayStack";


export default function OrderButton({ form }) {
  usePaystack();
  
  const { cart, placeOrder, clearCart } = useCart();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleOrder = async () => {
    if (loading) return;

    
    if (!form.customer_name || !form.customer_phone) {
      alert("Name and phone are required");
      return;
    }

    if (form.delivery_method === "DELIVERY" && !form.delivery_address) {
      alert("Delivery address is required");
      return;
    }

    if (!cart.items || cart.items.length === 0) {
      alert("Your cart is empty");
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      // create order
      const orderResponse = await placeOrder({
        ...form,
        payment_method: form.payment_method,
      });

      if (!orderResponse.success) {
        throw new Error(orderResponse.message);
      }

      const order = orderResponse.order;

      // 2.. CASH / COD → finish immediately
      if (form.payment_method === "CASH" || form.payment_method === "COD") {
        clearCart();
        navigate("/orders", { state: { orderId: order.id } });
        return;
      }

      // 3️⃣ CARD → Open Paystack popup
      if (form.payment_method === "CARD") {
        setLoading(false);

        const handler = window.PaystackPop.setup({
          key: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY,
          email: form.customer_email || "guest@koya.com",
          amount: order.total_price * 100,
          currency: "NGN",
          reference: `ORDER_${order.id}_${Date.now()}`,

          callback: function (response) {
            setStatus("Payment successful");
            clearCart();
            navigate("/orders", { state: { orderId: order.id } });
          },

          onClose: function () {
            setStatus("Payment cancelled");
          },
        });

        handler.openIframe();
      }
    } catch (error) {
      console.error(error);
      setStatus("Error: " + error.message);
    } finally {
      setLoading(false);
    }
    

  };

  return (
    <div>
      <button onClick={handleOrder} disabled={loading}>
        {loading ? "Processing..." : "Place Order"}
      </button>

      {status && <p>Status: {status}</p>}
    </div>
  );
}
