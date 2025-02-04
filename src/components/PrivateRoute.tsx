import React, { useEffect } from "react";
import { useNavigate } from "react-router";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const isAuthenticated = localStorage.getItem("authToken");
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return <>{children}</>;
};

export default PrivateRoute;
