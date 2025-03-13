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

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginSuccessPayload {
  currentBlogUser: CurrentBlogUser;
}
