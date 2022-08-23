import React from "react";
import { selectAuth } from "../../features/auth/auth";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

function RequireAuth({ children }: { children: JSX.Element }) {
  const auth = useAppSelector(selectAuth);

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default RequireAuth;