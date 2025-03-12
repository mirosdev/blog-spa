import { Blog, ErrorData } from '../../_accessories/interfaces/store.interface';
import {
  Action,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  on,
} from '@ngrx/store';
import { NGRX_FEATURE } from '../../_accessories/enums/ngrx-feature.enum';
import { loadBlogs, loadBlogsFail, loadBlogsSuccess } from './actions';

interface MainBlogsState {
  blogs: Blog[];
  loading: boolean;
  loaded: boolean;
  error: ErrorData | null;
}

const initialState: MainBlogsState = {
  blogs: [],
  loading: false,
  loaded: false,
  error: null,
};

const mainBlogsReducer = createReducer(
  initialState,
  on(loadBlogs, (state) => {
    return {
      ...state,
      loading: true,
    } as MainBlogsState;
  }),
  on(loadBlogsFail, (state, { payload }) => {
    return {
      ...state,
      loading: false,
      loaded: false,
      error: payload,
    } as MainBlogsState;
  }),
  on(loadBlogsSuccess, (state, { payload }) => {
    return {
      ...state,
      blogs: payload.blogs,
      loading: false,
      loaded: true,
      error: null,
    } as MainBlogsState;
  }),
);

export const selectMainBlogsLoading = (state: MainBlogsState) => state.loading;
export const selectMainBlogsLoaded = (state: MainBlogsState) => state.loaded;
export const selectMainBlogsError = (state: MainBlogsState) => state.error;

function reducer(state: MainBlogsState, action: Action): MainBlogsState | any {
  return mainBlogsReducer(state, action);
}

interface MainBlogsFeatureState {
  mainBlogs: MainBlogsState;
}

export const mainBlogsFeatureReducers: ActionReducerMap<MainBlogsFeatureState> =
  {
    mainBlogs: reducer,
  };

export const getMainBlogsFeatureState =
  createFeatureSelector<MainBlogsFeatureState>(NGRX_FEATURE.MAIN_BLOGS_FEATURE);
