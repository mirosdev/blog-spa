import { createSelector } from '@ngrx/store';
import {
  getAppFeatureState,
  selectAppError,
  selectAppLoaded,
  selectAppLoading,
  selectCurrentBlogUser,
} from './reducer';

const getAppState = createSelector(getAppFeatureState, (state) => state.app);

export const getCurrentBlogUser = createSelector(
  getAppState,
  selectCurrentBlogUser,
);

export const getAppLoading = createSelector(getAppState, selectAppLoading);

export const getAppLoaded = createSelector(getAppState, selectAppLoaded);

export const getAppError = createSelector(getAppState, selectAppError);
