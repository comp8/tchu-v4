import React from "react";
import { Navigate } from "react-router-dom";

export default function Fallback() {
  console.log('404 not found');
  return <Navigate to={'/'} />
}