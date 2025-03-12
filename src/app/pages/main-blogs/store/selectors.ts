import { createSelector } from '@ngrx/store';
import {
  getMainBlogsFeatureState,
  selectMainBlogsError,
  selectMainBlogsLoaded,
  selectMainBlogsLoading,
} from './reducer';

const getMainBlogsState = createSelector(
  getMainBlogsFeatureState,
  (state) => state.mainBlogs,
);

export const getMainBlogsLoading = createSelector(
  getMainBlogsState,
  selectMainBlogsLoading,
);

export const getMainBlogsLoaded = createSelector(
  getMainBlogsState,
  selectMainBlogsLoaded,
);

export const getMainBlogsError = createSelector(
  getMainBlogsState,
  selectMainBlogsError,
);
