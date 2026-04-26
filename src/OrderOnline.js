import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { useLocation } from "react-router-dom";

const API_BASE_URL = "http://127.0.0.1:8000";

export default function Orders() {
  const { token } = useAuth();
  const location = useLocation();
  const orderId = location.state?.orderId; // single order after checkout
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        let url = `${API_BASE_URL}/orders/`;
        if (orderId) url = `${API_BASE_URL}/orders/${orderId}/`; // single order

        const headers = {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        };

        const res = await fetch(url, { headers });
        const data = await res.json();

        if (orderId) setOrders([data]); // wrap single order in array
        else setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
    };

    fetchOrders();
  }, [token, orderId]);

  if (orders.length === 0) {
    return <p>SIGN UP OR LOGIN TO VIEW ORDERS HISTORY</p>;
  }

  return (
    <div>
      <h2>Your Orders</h2>

      {orders.map(order => (
        <div key={order.id} className="p-4 border rounded mb-4">
          <h4>Order #{order.id}</h4>
          <p>Status: {order.status}</p>
          <p>Name: {order.customer_name}</p>
          <p>Phone: {order.customer_phone}</p>
          <p>Delivery address: {order.delivery_address || "N/A"}</p>
          <p>Total: ₦{order.total_price?.toFixed(2) || "0.00"}</p>
          <p>Payment Status: {order.payment?.status || "N/A"}</p>

          <h5>Items:</h5>
          <ul>
            {order.items.map(item => (
              <li key={item.id}>
                {item.item_name} x {item.quantity} - ₦{(item.item_price * item.quantity).toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
