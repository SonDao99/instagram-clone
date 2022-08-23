import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { selectAuth } from "../../features/auth/auth";
import { useAppSelector } from "../../app/hooks";

const NavigateHomeIfAuthed = ({children}:{children: JSX.Element}) => {
  const auth = useAppSelector(selectAuth);
  const location = useLocation();

  if (auth.isAuthenticated && location.pathname === "/login") {
    return <Navigate to="/"/>
  }

  return children;
}

export default NavigateHomeIfAuthed;