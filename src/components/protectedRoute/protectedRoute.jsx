import { useContext } from "react";
import { Navigate } from "react-router";
import { UserContext } from "../../context/user.context";


export default function ProtectedRoute({ children }) {
  const { token } = useContext(UserContext);
  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
}