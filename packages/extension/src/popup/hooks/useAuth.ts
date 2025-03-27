import {
  useCallback, useState
} from "react";
import {
  LoginResponse,
  MessageTypes, RefreshAuthResponse
} from "../../common/types";

export function useAuth(){
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const refreshAuth = useCallback(() => chrome.runtime
    .sendMessage({type: MessageTypes.refreshAuth},
      (response:RefreshAuthResponse) => {
        setIsAuthenticated(!!response.payload?.username);

      }), []);
  const login = useCallback((username: string, password: string) =>
    chrome.runtime.sendMessage({
      type: MessageTypes.login,
      payload: {
        username,
        password
      }
    }, (response:LoginResponse) => {
      setIsAuthenticated(!!response.payload?.username);
    }), []);
  const logout = useCallback(() =>
    chrome.runtime.sendMessage({type: MessageTypes.logout},
      () => {
        setIsAuthenticated(false);
      }), []);

  return [isAuthenticated, refreshAuth, login, logout] as const;
}