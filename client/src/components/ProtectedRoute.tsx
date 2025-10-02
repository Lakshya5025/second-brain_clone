import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  const hasToken = document.cookie.includes("token");
  return hasToken;
};

const ProtectedRoute = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/signin" />;
};

export default ProtectedRoute;
