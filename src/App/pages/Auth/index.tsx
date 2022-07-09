import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLocalStorageState } from "../../../hooks/usePersistentState";

import { Transition } from "../../../components/Transition";

export default function AuthPage() {

  const location = useLocation();
  const navigate = useNavigate();
  const [_, setToken] = useLocalStorageState<string>('token', '');

  useEffect(() => {
    const params = new URLSearchParams(location.hash.slice(1));
    const token = params.get('access_token');
    token && setToken(token);
    navigate('/', { replace: true });
  });
  // }, [location]);

  return (
    <Transition duration={1000}>{
      (_, done) => done && <Link to={'/'}>Home</Link>
    }</Transition>
  );
}