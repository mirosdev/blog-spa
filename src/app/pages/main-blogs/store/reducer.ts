import { Blog, ErrorData } from '../../_accessories/interfaces/store.interface';
import { createFeature, createReducer, on } from '@ngrx/store';
import { NGRX_FEATURE } from '../../_accessories/enums/ngrx-feature.enum';
import {
  commentBlogArticle,
  commentBlogArticleFail,
  commentBlogArticleSuccess,
  loadBlogs,
  loadBlogsFail,
  loadBlogsSuccess,
} from './actions';

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
    on(commentBlogArticle, (state) => {
      return {
        ...state,
        loading: true,
      } as MainBlogsState;
    }),
    on(commentBlogArticleFail, (state, { payload }) => {
      return {
        ...state,
        loading: false,
        error: payload,
      } as MainBlogsState;
    }),
    on(commentBlogArticleSuccess, (state, { payload }) => {
      const blogs: Blog[] = structuredClone(state.blogs) as Blog[];
      blogs.forEach((blog: Blog) => {
        if (blog.uuid === payload.articleUuid) {
          blog.comments.push({
            uuid: payload.commentUuid,
            content: payload.content,
          });
        }
      });

      return {
        ...state,
        blogs,
        loading: false,
      } as MainBlogsState;
    }),
  ),
});

export const { selectLoaded, selectBlogs } = mainBlogsFeature;
