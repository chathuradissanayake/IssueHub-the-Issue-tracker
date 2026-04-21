// src/components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import type { ReactElement } from "react";
import { isTokenExpired } from "../utils/auth";

const ProtectedRoute = ({ children }: { children: ReactElement }) => {
  const token = localStorage.getItem("token");

  if (!token || isTokenExpired(token)) {
    localStorage.removeItem("token");
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;