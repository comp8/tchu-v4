import { useCallback } from "react";
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import Actions from "../store/actions";

export function useLogout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return useCallback(() => {
    try {
      localStorage.removeItem('token');
      localStorage.setItem('force_verify', 'true');
    }
    catch (ex) {
      console.error(ex);
    }
    dispatch(Actions.Channel.Logout());
    navigate('/', { replace: true });
  }, []);
}