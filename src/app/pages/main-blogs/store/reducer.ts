import {
  BlogArticle,
  BlogArticleLike,
  ErrorData,
} from '../../_accessories/interfaces/store.interface';
import { createFeature, createReducer, on } from '@ngrx/store';
import { NGRX_FEATURE } from '../../_accessories/enums/ngrx-feature.enum';
import {
  commentBlogArticle,
  commentBlogArticleFail,
  commentBlogArticleSuccess,
  createArticle,
  createArticleFail,
  createArticleSuccess,
  loadBlogs,
  loadBlogsFail,
  loadBlogsSuccess,
  toggleArticleLike,
  toggleArticleLikeFail,
  toggleArticleLikeSuccess,
  updateArticle,
  updateArticleFail,
  updateArticleSuccess,
} from './actions';

interface MainBlogsState {
  blogs: BlogArticle[];
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
      const blogs: BlogArticle[] = structuredClone(
        state.blogs,
      ) as BlogArticle[];
      blogs.forEach((blog: BlogArticle) => {
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
    on(updateArticle, (state) => {
      return {
        ...state,
        loading: true,
      } as MainBlogsState;
    }),
    on(updateArticleFail, (state, { payload }) => {
      return {
        ...state,
        loading: false,
        error: payload,
      } as MainBlogsState;
    }),
    on(updateArticleSuccess, (state, { payload }) => {
      const blogs: BlogArticle[] = structuredClone(
        state.blogs,
      ) as BlogArticle[];
      const index = blogs.findIndex(
        (blog: BlogArticle) => blog.uuid === payload.uuid,
      );
      if (index > -1) {
        blogs[index] = payload;
      }

      return {
        ...state,
        blogs,
        loading: false,
      } as MainBlogsState;
    }),
    on(createArticle, (state) => {
      return {
        ...state,
        loading: true,
      } as MainBlogsState;
    }),
    on(createArticleFail, (state, { payload }) => {
      return {
        ...state,
        loading: false,
        error: payload,
      } as MainBlogsState;
    }),
    on(createArticleSuccess, (state, { payload }) => {
      return {
        ...state,
        blogs: [payload, ...state.blogs],
        loading: false,
      } as MainBlogsState;
    }),
    on(toggleArticleLike, (state) => {
      return {
        ...state,
        loading: true,
      } as MainBlogsState;
    }),
    on(toggleArticleLikeFail, (state, { payload }) => {
      return {
        ...state,
        loading: false,
        error: payload,
      } as MainBlogsState;
    }),
    on(toggleArticleLikeSuccess, (state, { payload }) => {
      const blogs: BlogArticle[] = structuredClone(
        state.blogs,
      ) as BlogArticle[];
      const index = blogs.findIndex(
        (blog: BlogArticle) => blog.uuid === payload.articleUuid,
      );
      if (index > -1) {
        if (
          blogs[index].likes.some(
            (like: BlogArticleLike) =>
              like.blogUserUuid === payload.like.blogUserUuid,
          )
        ) {
          blogs[index].likes = blogs[index].likes.filter(
            (like: BlogArticleLike) =>
              like.blogUserUuid !== payload.like.blogUserUuid,
          );
        } else {
          blogs[index].likes.push(payload.like);
        }
      }

      return {
        ...state,
        blogs,
        loading: false,
      } as MainBlogsState;
    }),
  ),
});

export const { selectLoaded, selectBlogs } = mainBlogsFeature;
