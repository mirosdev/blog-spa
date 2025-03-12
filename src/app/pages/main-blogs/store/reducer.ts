import { Blog, ErrorData } from '../../_accessories/interfaces/store.interface';
import { createFeature, createReducer, on } from '@ngrx/store';
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

export const mainBlogsFeature = createFeature({
  name: NGRX_FEATURE.MAIN_BLOGS_FEATURE,
  reducer: createReducer(
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
  ),
});

export const { selectLoaded } = mainBlogsFeature;
