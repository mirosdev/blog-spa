import {
  Action,
  ActionReducerMap,
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

const appReducer = createReducer(
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
);

export const selectCurrentBlogUser = (state: AppState) => state.currentBlogUser;
export const selectAppLoading = (state: AppState) => state.loading;
export const selectAppLoaded = (state: AppState) => state.loaded;
export const selectAppError = (state: AppState) => state.error;

function reducer(state: AppState, action: Action): AppState | any {
  return appReducer(state, action);
}

interface AppFeatureState {
  app: AppState;
}

export const appFeatureReducers: ActionReducerMap<AppFeatureState> = {
  app: reducer,
};

export const getAppFeatureState = createFeatureSelector<AppFeatureState>(
  NGRX_FEATURE.APP_FEATURE,
);
