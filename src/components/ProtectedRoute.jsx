import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Only logged-in users can see the children; others are sent to /login and come back after.
export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();
  if (!user)
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname, msg: "Please log in to continue." }}
      />
    );
  return children;
}
