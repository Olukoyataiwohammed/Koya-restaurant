import { useState } from "react";
import { useAuth } from "./AuthContext";
import CheckoutForm from "./CheckoutForm";
import OrderButton from "./OrderButton";

export default function CheckoutPage() {
  const { user } = useAuth();

  const [form, setForm] = useState({
    customer_name: user?.username || "",
    customer_phone: "",
    delivery_address: "",
    delivery_method: "DELIVERY",
    payment_method: "CARD",
  });

  return (
    <div>
      <h2>Checkout</h2>

      <CheckoutForm form={form} setForm={setForm} isGuest={!user} />

      <OrderButton form={form} />
    </div>
  );
}
