import { createAction, props } from '@ngrx/store';
import {
  CurrentBlogUser,
  ErrorData,
} from '../pages/_accessories/interfaces/store.interface';

const LOGIN = '[AppFeatureState] Login';
const LOGIN_FAIL = '[AppFeatureState] Login Fail';
const LOGIN_SUCCESS = '[AppFeatureState] Login Success';
const CHECK_TOKEN = '[AppFeatureState] Check Token';
const LOGOUT = '[AppFeatureState] Logout';
const CLEAR_USER_STATE = '[AppFeatureState] Clear User State';
const REGISTER = '[AppFeatureState] Register';
const REGISTER_FAIL = '[AppFeatureState] Register Fail';
const CHECK_USERNAME_AVAILABILITY =
  '[AppFeatureState] Check Username Availability';
const CHECK_USERNAME_AVAILABILITY_FAIL =
  '[AppFeatureState] Check Username Availability Fail';
const CHECK_USERNAME_AVAILABILITY_SUCCESS =
  '[AppFeatureState] Check Username Availability Success';

export const login = createAction(LOGIN, props<{ payload: LoginPayload }>());
export const loginFail = createAction(
  LOGIN_FAIL,
  props<{ payload: ErrorData }>(),
);
export const loginSuccess = createAction(
  LOGIN_SUCCESS,
  props<{ payload: LoginSuccessPayload }>(),
);
export const checkToken = createAction(CHECK_TOKEN);
export const logout = createAction(LOGOUT);
export const clearUserState = createAction(CLEAR_USER_STATE);
export const register = createAction(
  REGISTER,
  props<{ payload: RegisterPayload }>(),
);
export const registerFail = createAction(
  REGISTER_FAIL,
  props<{ payload: ErrorData }>(),
);
export const checkUsernameAvailability = createAction(
  CHECK_USERNAME_AVAILABILITY,
  props<{ payload: UsernameAvailabilityRequestPayload }>(),
);
export const checkUsernameAvailabilityFail = createAction(
  CHECK_USERNAME_AVAILABILITY_FAIL,
  props<{ payload: ErrorData }>(),
);
export const checkUsernameAvailabilitySuccess = createAction(
  CHECK_USERNAME_AVAILABILITY_SUCCESS,
  props<{ payload: UsernameAvailabilityResponsePayload }>(),
);

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginSuccessPayload {
  currentBlogUser: CurrentBlogUser;
}

export interface RegisterPayload {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface UsernameAvailabilityRequestPayload {
  username: string;
}

export interface UsernameAvailabilityResponsePayload {
  available: boolean;
}
