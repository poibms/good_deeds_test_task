import { AuthCreds, userUpdateCreds } from './../types/types';
import localStorageService from "../services/localStorage.service";
import { UserType } from "../types/types";
import { AppThunk, RootState } from "./createStore";
import authService from '../services/auth.service';
import { createSlice } from '@reduxjs/toolkit';
import userService from '../services/user.service';

type UserInitialState = {
  entities: Array<UserType>;
  isLoading: boolean;
  error: string | null;
  auth: UserType;
  isLoggedIn: boolean;
};

const initialState: UserInitialState = localStorageService.getAccessToken()
  ? {
      entities: [],
      isLoading: true,
      error: null,
      auth: { ...localStorageService.getUserData() },
      isLoggedIn: true,
    }
  : {
      entities: [],
      isLoading: false,
      error: null,
      auth: {  },
      isLoggedIn: false,
    };

    const usersSlice = createSlice({
      name: 'users',
      initialState: initialState,
      reducers: {
        usersRequested: state => {
          state.isLoading = true;
        },
        usersReceived: (state, action) => {
          state.entities = action.payload;
          state.isLoading = false;
        },
        usersRequestFailed: (state, action) => {
          state.error = action.payload;
          state.isLoading = false;
        },
        authRequested: state => {
          state.error = null;
        },
        authRequestSuccess: (state, action) => {
          state.auth = action.payload;
          state.isLoggedIn = true;
        },
        authRequestFailed: (state, action) => {
          state.error = action.payload;
        },
        userCreated: (state, action) => {
          state.entities.push(action.payload);
        },
        userUpdated: (state, action) => {
          // const userIndex = state.entities.findIndex(user => user._id === action.payload._id);
          state.auth = { ...state.auth, ...action.payload}
          // state.entities[userIndex] = action.payload;
        },
        userLoggedOut: state => {
          state.isLoggedIn = false;
          state.auth = {};
        },
      },
    });
    
    const { actions, reducer: usersReducer } = usersSlice;
    
    const {
      usersRequested,
      usersReceived,
      usersRequestFailed,
      authRequested,
      authRequestSuccess,
      authRequestFailed,
      userUpdated,
      userLoggedOut,
    } = actions;



export const updateUserData =
(payload: userUpdateCreds): AppThunk =>
async dispatch => {
  dispatch(usersRequested());
  try {
    const updatedUser = await userService.updateUserData(payload);
    dispatch(userUpdated(updatedUser));

  } catch (error: any) {
    dispatch(usersRequestFailed(error.message));
  }
};

export const signIn =
  (payload: AuthCreds, navigFunc: any): AppThunk =>
  async dispatch => {
    dispatch(authRequested());
    try {
      const data = await authService.signIn(payload);
      localStorageService.setToken(data.accessToken);
      navigFunc('/');
      dispatch(authRequestSuccess({ ...localStorageService.getUserData() }));
    } catch (error: any) {
      const { message } = error.response.data;
      dispatch(authRequestFailed(message));
    }
  };

export const signUp =
  (payload: AuthCreds, navigFunc: any): AppThunk =>
  async dispatch => {
    dispatch(authRequested());
    try {
      const data = await authService.signUp(payload);
      console.log(data)
      localStorageService.setToken(data.accessToken);
      navigFunc('/');
      dispatch(authRequestSuccess({ ...localStorageService.getUserData() }));
    } catch (error: any) {
      const { message } = error.response.data;
      dispatch(authRequestFailed(message));
    }
  };

export const logOut = (): AppThunk => async dispatch => {
  localStorageService.removeToken();
  dispatch(userLoggedOut());
};

export const loadUsersList = (): AppThunk => async (dispatch, getState) => {
  dispatch(usersRequested());
  try {
    const content = await userService.getAllUsers();
    dispatch(usersReceived(content));
  } catch (error: any) {
    dispatch(usersRequestFailed(error.message));
  }
};

export const getAuthErrors = () => (state: RootState) => state.users.error;

export const getIsLoggedIn = () => (state: RootState) => state.users.isLoggedIn;

export const getUsersLoadingStatus = () => (state: RootState) => state.users.isLoading;

export const getAuthUserInfo = () => (state: RootState) => state.users.auth;

export const getUserById = (id?: string) => (state: RootState) => {
  if (state.users.entities) {
    return state.users.entities.find((user: UserType) => user._id === id);
  }
}

export default usersReducer;
