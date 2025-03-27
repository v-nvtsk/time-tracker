import {useCallback} from "react";
import {useSelector} from "react-redux";
import {useAppDispatch} from "../app/store/hooks/use-app-dispatch";
import {selectAuth} from "../app/store/selectors";
import {
  authLogin, authLogout
} from "../app/store/slices/auth-slice";

export function useAuth(){
  const {isAuthenticated} = useSelector(selectAuth);
  const appDispatch = useAppDispatch();
  const refreshAuth = useCallback(() => {}, []);
  const login = useCallback((username: string, password: string) => {
    appDispatch(authLogin({
      username,
      password
    }));
  }, [appDispatch]);
  const logout = useCallback(() => appDispatch(authLogout()), [appDispatch]);

  return [isAuthenticated, refreshAuth, login, logout] as const;
}