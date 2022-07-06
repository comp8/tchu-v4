import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function RemoveTrailingSlash() {
  const location = useLocation();
  if (/.*\/$/.test(location.pathname)) {
    return <Navigate
      replace={true}
      state={location.state}
      to={{
        pathname: location.pathname.replace(/\/$/, ''),
        search: location.search,
        hash: location.hash
      }}
    />;
  }
  return null;
}