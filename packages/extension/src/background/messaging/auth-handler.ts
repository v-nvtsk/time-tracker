import {
  isError,
  LoginResponse, LogoutResponse, PayloadOf, RefreshAuthResponse
  , Store
} from "../../common/types";
import {logError} from "../../common/utils";
import {authApi} from "../api";
import {setAuthToken} from "../api/axios/axios-client";
import {
  failedResponse, successResponse
} from "../response";

export async function loginHandler(username: string, password: string):Promise<LoginResponse>{
  try{
    if (!username.trim() || !password.trim() || username.length < 3 || password.length < 8){
      return failedResponse('Invalid username or password');
    }

    const result = await authApi.login({
      username,
      password
    });

    if (!result.status){
      throw new Error('Login failed');
    }
    await chrome.storage.local.set<Store>({isAuthenticated: true});
    await chrome.storage.local.set<Store>({token: result.data.token});
    await chrome.storage.local.set<Store>({username});

    return successResponse <PayloadOf<LoginResponse>>({
      username,
      token: 'token'
    });
  } catch(error) {
    if (isError(error)) {
      return(failedResponse(error.message));
    }

    return(failedResponse('Login error'));
  }

}
export async function logoutHandler():Promise<LogoutResponse>{

  await chrome.storage.local.clear();

  return successResponse(void null);
}
export async function refreshSessionHandler():Promise<RefreshAuthResponse>{
  try{

    const {token} = await chrome.storage.local.get<Store>('token');
  
    if (token){
      setAuthToken(token);
    
      const response = await authApi.refresh();

      if (response.status) {
        return successResponse<PayloadOf<RefreshAuthResponse>>(response.data);
      }
      if (response.statusText === 'Unauthorized'){
        await chrome.storage.local.clear();
      }
    }
  }catch (e){
    logError('Failed to refresh session', e);
  }

  return failedResponse('Not authenticated');
  
}