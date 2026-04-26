export default function CheckoutForm({ form, setForm, isGuest }) {
  return (
    <div>
      <input
        type="text"
        placeholder="Full name"
        value={form.customer_name}
        onChange={(e) =>
          setForm({ ...form, customer_name: e.target.value })
        }
      />

      <input
        type="text"
        placeholder="Phone number"
        value={form.customer_phone}
        onChange={(e) =>
          setForm({ ...form, customer_phone: e.target.value })
        }
      />

      <select
        value={form.delivery_method}
        onChange={(e) =>
          setForm({ ...form, delivery_method: e.target.value })
        }
      >
        <option value="DELIVERY">Delivery</option>
        <option value="PICKUP">Pickup</option>
      </select>

      {form.delivery_method === "DELIVERY" && (
        <textarea
          placeholder="Delivery address"
          value={form.delivery_address}
          onChange={(e) =>
            setForm({ ...form, delivery_address: e.target.value })
          }
        />
      )}

      <div style={{ marginTop: "1rem" }}>
        <label htmlFor="payment_method">Payment Method:</label>
        <select
          id="payment_method"
          value={form.payment_method}
          onChange={(e) =>
            setForm({ ...form, payment_method: e.target.value })
          }
        >
          <option value="CARD">Card</option>
          <option value="CASH">Cash</option>
          <option value="PAYPAL">PayPal</option>
          <option value="BANK">Bank Transfer</option>
        </select>
      </div>
    </div>
  );
}
