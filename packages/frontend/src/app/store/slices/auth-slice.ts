import {
  createAsyncThunk, createSlice,
  PayloadAction
} from "@reduxjs/toolkit";
import {
  authApi,
  LoginRequest,
  LoginSuccessResponse,
  RefreshAuthSuccessResponse,
  RegisterRequest,
  RegisterSuccessResponse,
} from "@/api";
import {setAuthToken} from "@/api/axios/axios-client";
import {ErrorState} from "@/types";
import {AppRootState} from "..";

export const authLogin = createAsyncThunk<LoginSuccessResponse, LoginRequest,
  {rejectValue: string}
>('auth/login', async (credentials, {rejectWithValue}) => {
  const result = await authApi.login(credentials);

  if (!result.status){
    return rejectWithValue('Не удалось войти');
  }

  return result.data;
});
export const authRegister = createAsyncThunk<RegisterSuccessResponse, RegisterRequest, {rejectValue: string}>('auth/register', async (credentials, {rejectWithValue}) => {
  const result = await authApi.register(credentials);

  if (!result.status){
    return rejectWithValue('Не удалось зарегистрироваться');
  }

  return result.data;
});

export const updateSession = createAsyncThunk <RefreshAuthSuccessResponse,
  void,
  {
    state: AppRootState;
    rejectValue: string;
  }
>('auth/updateSession', async (_, thunkApi) => {
  const {rejectWithValue} = thunkApi;
  const token = localStorage.getItem('token');

  if (!token) {
    return rejectWithValue('Failed to update session...');
  }
  
  const result = await authApi.refresh();

  if (!result.status){
    rejectWithValue('Failed to update session...');
  }
  setAuthToken(result.data.token);

  return result.data;

},
{condition: (_, thunkApi) => {
  const {getState} = thunkApi;

  return !getState().auth.isLoading;
}}
);

export interface AuthState {
  isLoading: boolean,
  isInitialized: boolean,
  isAuthenticated: boolean,
  errorState: ErrorState,
  profile: {
    username?: string,
    token?: string
  }
}

const initialState:AuthState = {
  isLoading: false,
  isInitialized: false,
  isAuthenticated: false,
  errorState: {
    isError: false,
    errorMessage: null
  },
  profile: {}
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {logout: (state) => {
    state.profile = {};
    state.isAuthenticated = false;
    localStorage.removeItem('token');
  }},
  extraReducers: (builder) => {
    builder
      .addCase (authLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authLogin.fulfilled, (state, action:PayloadAction<AuthState['profile']>) => {
        const {
          username, token
        } = action.payload;
        
        state.isLoading = false;
        state.isAuthenticated = true;
        state.profile = {
          username,
          token
        };
      })
      .addCase(authLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.errorState = {
          isError: true,
          errorMessage: action.payload!
        };
        state.profile = {};
      })
      .addCase(authRegister.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authRegister.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(authRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.errorState = {
          isError: true,
          errorMessage: action.payload!
        };
      })
      .addCase(updateSession.pending, (state) => {
        state.isLoading = true;
        state.isInitialized = false;
      })
      .addCase(updateSession.fulfilled, (state, action: PayloadAction<RefreshAuthSuccessResponse>) => {
        if (typeof action.payload !== "string") {
          state.isLoading = false;
          state.isAuthenticated = true;
          state.isInitialized = true;
          state.profile = {
            username: action.payload.username,
            token: action.payload.token
          };
        }
      })
      .addCase(updateSession.rejected, (state) => {
        state.isLoading = false;
        state.isInitialized = true;
        state.isAuthenticated = false;
        state.errorState.isError = false;
        state.errorState.errorMessage = '';
      });
  }
});

export const authLogout = authSlice.actions.logout;