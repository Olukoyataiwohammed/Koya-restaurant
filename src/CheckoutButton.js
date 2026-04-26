import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function CheckoutButton({ showGuestFormInline = false }) {
  const navigate = useNavigate();

  useAuth(); // keep hook ONLY if you actually need auth state

  if (!showGuestFormInline) {
    return (
      <button onClick={() => navigate("/checkout")}>
        Checkout
      </button>
    );
  }

  return null;
}