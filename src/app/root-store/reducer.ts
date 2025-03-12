import {
  createFeature,
  createFeatureSelector,
  createReducer,
  on,
} from '@ngrx/store';
import { NGRX_FEATURE } from '../pages/_accessories/enums/ngrx-feature.enum';
import { login, loginFail, loginSuccess } from './actions';
import {
  CurrentBlogUser,
  ErrorData,
} from '../pages/_accessories/interfaces/store.interface';

interface AppState {
  currentBlogUser: CurrentBlogUser | null;
  loading: boolean;
  loaded: boolean;
  error: ErrorData | null;
}

const initialState: AppState = {
  currentBlogUser: null,
  loading: false,
  loaded: false,
  error: null,
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
    on(loginSuccess, (state, { payload }) => {
      return {
        ...state,
        currentBlogUser: payload.currentBlogUser,
        loading: false,
        loaded: true,
        error: null,
      } as AppState;
    }),
  ),
});

export const { selectCurrentBlogUser } = appFeature;
