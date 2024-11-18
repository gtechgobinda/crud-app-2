import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../authContext/auth.jsx";
import Loader from "../components/loader/index.jsx";

const ProtectedRoute = ({ children }) => {
  const { authUser, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <Loader />;
  }

  if (!authUser) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
