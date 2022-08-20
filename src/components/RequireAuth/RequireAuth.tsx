import React from "react";
import { selectAuth } from "../../features/auth/auth";
import { useLocation, Navigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

function RequireAuth({ children }: { children: JSX.Element }) {
  const auth = useAppSelector(selectAuth);
  const location = useLocation();
  
  if (!auth.isAuthenticated) {
    return <Navigate to="/login" />;
  } else if (auth.isAuthenticated && location.pathname === "/login") {
    return <Navigate to="/" />;
  }

  return children;
}

export default RequireAuth;