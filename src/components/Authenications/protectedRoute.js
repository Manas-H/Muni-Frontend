import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ element, requiredType }) => {
  const token = localStorage.getItem("token"); // Retrieve the token from localStorage

  if (!token) {
    // If there's no token, redirect to login
    return <Navigate to="/" />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Get current time in seconds

    if (decodedToken.exp < currentTime) {
      // If the token is expired, remove it from localStorage and redirect to login
      localStorage.removeItem("token");
      return <Navigate to="/" />;
    }

    const userType = decodedToken.ActualType;

    if (userType !== requiredType) {
      // If user type does not match the required type, redirect to not found
      return <Navigate to="/not-found" />;
    }
  } catch (error) {
    // If token is invalid, remove it and redirect to login
    localStorage.removeItem("token");
    return <Navigate to="/" />;
  }

  // If everything is valid, render the component
  return element;
};

export default ProtectedRoute;
