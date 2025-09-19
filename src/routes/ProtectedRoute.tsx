import { Navigate, Outlet } from "react-router-dom";
import { getCurrentUser } from "../auth";

export default function ProtectedRoute() {
  const user = getCurrentUser();
  return user ? <Outlet /> : <Navigate to="/login" replace />;
}
// Si hay usuario, renderiza las rutas hijas (Outlet), si no redirige a /login