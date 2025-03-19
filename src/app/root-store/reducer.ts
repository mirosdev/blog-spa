import { createFeature, createReducer, on } from '@ngrx/store';
import { NGRX_FEATURE } from '../pages/_accessories/enums/ngrx-feature.enum';
import {
  checkUsernameAvailability,
  checkUsernameAvailabilityFail,
  checkUsernameAvailabilitySuccess,
  clearUserState,
  login,
  loginFail,
  setUserData,
  register,
  registerFail,
} from './actions';
import {
  CurrentBlogUser,
  ErrorData,
  UsernameAvailability,
} from '../pages/_accessories/interfaces/store.interface';

interface AppState {
  currentBlogUser: CurrentBlogUser | null;
  loading: boolean;
  loaded: boolean;
  error: ErrorData | null;

  usernameAvailability: UsernameAvailability | null;
}

const initialState: AppState = {
  currentBlogUser: null,
  loading: false,
  loaded: false,
  error: null,

  usernameAvailability: null,
};

export const appFeature = createFeature({
  name: NGRX_FEATURE.APP_FEATURE,
  reducer: createReducer(
    initialState,
    on(login, (state) => {
      return {
        ...state,
        loading: true,
      } as AppState;
    }),
    on(loginFail, (state, { payload }) => {
      return {
        ...state,
        loading: false,
        loaded: false,
        error: payload,
      } as AppState;
    }),
    on(setUserData, (state, { payload }) => {
      return {
        ...state,
        currentBlogUser: payload.currentBlogUser,
        loading: false,
        loaded: true,
        error: null,
      } as AppState;
    }),
    on(register, (state) => {
      return {
        ...state,
        loading: true,
      } as AppState;
    }),
    on(registerFail, (state, { payload }) => {
      return {
        ...state,
        loading: false,
        loaded: false,
        error: payload,
      } as AppState;
    }),
    on(clearUserState, () => {
      return initialState;
    }),
    on(checkUsernameAvailability, (state) => {
      return {
        ...state,
      } as AppState;
    }),
    on(checkUsernameAvailabilityFail, (state) => {
      return {
        ...state,
      } as AppState;
    }),
    on(checkUsernameAvailabilitySuccess, (state, { payload }) => {
      return {
        ...state,
        usernameAvailability: {
          available: payload.available,
        },
      } as AppState;
    }),
  ),
});

export const { selectCurrentBlogUser, selectUsernameAvailability } = appFeature;
