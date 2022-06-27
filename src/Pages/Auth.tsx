import React from "react";
import { Navigate, useLocation } from "react-router-dom";

interface AuthProps {

}

export default function Auth(props: AuthProps) {
  const location = useLocation();
  if (location.hash) {
    const params = new URLSearchParams(location.hash.slice(1));
    const access_token = params.get('access_token');
    try {
      if (!access_token) {
        return <Navigate replace to={'/'} />;
      }
      localStorage.removeItem('force_verify');
      localStorage.setItem('token', access_token);
      return <Navigate replace to={'/app'} />;
    }
    catch(ex) {
      console.error(ex);
      console.error('localStorage.setItem error');
      return <Navigate replace to={'/error/localStorage'} />;
    }
  }
  return <Navigate replace to={'/'} />;
}