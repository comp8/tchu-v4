import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function NotFound() {
  const location = useLocation();
  console.error('404 Not Found!', location);
  return <Navigate replace to={'/'} />;
}