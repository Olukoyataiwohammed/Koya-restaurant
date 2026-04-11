export default function OrderButton({ form, newAddress, useNewAddress, token }) {
  const handlePlaceOrder = async () => {

    const payload = useNewAddress
      ? {
          payment_method: form.payment_method,
          full_name: newAddress.full_name,
          phone: newAddress.phone,
          address_line: newAddress.address_line,
          city: newAddress.city,
          state: newAddress.state,
          country: newAddress.country,
          postal_code: newAddress.postal_code,
          is_default: newAddress.is_default,
        }
      : {
          payment_method: form.payment_method,
          address_id: form.address_id,
        };

    try {
      const res = await fetch("http://127.0.0.1:8000/order/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      console.log("Order response:", data);

      // ✅ IMPORTANT CHECK
      if (!res.ok) {
        alert(data.error || "Order failed");
        return;
      }

      alert("Order placed successfully!");

    } catch (err) {
      console.error(err);
      alert("Network error while placing order");
    }
  };

  return (
    <button onClick={handlePlaceOrder} style={{ marginTop: "20px" }}>
      Place Order
    </button>
  );
}