import { createAction, props } from '@ngrx/store';
import {
  BlogArticle,
  BlogArticleLike,
  ErrorData,
} from '../../_accessories/interfaces/store.interface';

const LOAD_BLOGS = '[MainBlogsFeatureState] Load Blogs';
const LOAD_BLOGS_FAIL = '[MainBlogsFeatureState] Load Blogs Fail';
const LOAD_BLOGS_SUCCESS = '[MainBlogsFeatureState] Load Blogs Success';
const COMMENT_BLOG_ARTICLE = '[MainBlogsFeatureState] Comment Blog Article';
const COMMENT_BLOG_ARTICLE_FAIL =
  '[MainBlogsFeatureState] Comment Blog Article Fail';
const COMMENT_BLOG_ARTICLE_SUCCESS =
  '[MainBlogsFeatureState] Comment Blog Article Success';
const UPDATE_ARTICLE = '[MainBlogsFeatureState] Update Article';
const UPDATE_ARTICLE_FAIL = '[MainBlogsFeatureState] Update Article Fail';
const UPDATE_ARTICLE_SUCCESS = '[MainBlogsFeatureState] Update Article Success';
const CREATE_ARTICLE = '[MainBlogsFeatureState] Create Article';
const CREATE_ARTICLE_FAIL = '[MainBlogsFeatureState] Create Article Fail';
const CREATE_ARTICLE_SUCCESS = '[MainBlogsFeatureState] Create Article Success';
const TOGGLE_ARTICLE_LIKE = '[MainBlogsFeatureState] Toggle Article Like';
const TOGGLE_ARTICLE_LIKE_FAIL =
  '[MainBlogsFeatureState] Toggle Article Like Fail';
const TOGGLE_ARTICLE_LIKE_SUCCESS =
  '[MainBlogsFeatureState] Toggle Article Like Success';

export const loadBlogs = createAction(LOAD_BLOGS);

export const loadBlogsFail = createAction(
  LOAD_BLOGS_FAIL,
  props<{ payload: ErrorData }>(),
);

export const loadBlogsSuccess = createAction(
  LOAD_BLOGS_SUCCESS,
  props<{ payload: BlogsPayload }>(),
);

export const commentBlogArticle = createAction(
  COMMENT_BLOG_ARTICLE,
  props<{ payload: CommentPayload }>(),
);

export const commentBlogArticleFail = createAction(
  COMMENT_BLOG_ARTICLE_FAIL,
  props<{ payload: ErrorData }>(),
);

export const commentBlogArticleSuccess = createAction(
  COMMENT_BLOG_ARTICLE_SUCCESS,
  props<{ payload: CommentPayload }>(),
);

export const updateArticle = createAction(
  UPDATE_ARTICLE,
  props<{ payload: ArticleUpdateRequestPayload }>(),
);

export const updateArticleFail = createAction(
  UPDATE_ARTICLE_FAIL,
  props<{ payload: ErrorData }>(),
);

export const updateArticleSuccess = createAction(
  UPDATE_ARTICLE_SUCCESS,
  props<{ payload: BlogArticle }>(),
);

export const createArticle = createAction(
  CREATE_ARTICLE,
  props<{ payload: NewBlogArticlePayload }>(),
);

export const createArticleFail = createAction(
  CREATE_ARTICLE_FAIL,
  props<{ payload: ErrorData }>(),
);

export const createArticleSuccess = createAction(
  CREATE_ARTICLE_SUCCESS,
  props<{ payload: BlogArticle }>(),
);

export const toggleArticleLike = createAction(
  TOGGLE_ARTICLE_LIKE,
  props<{ payload: ArticleLikeRequestPayload }>(),
);

export const toggleArticleLikeFail = createAction(
  TOGGLE_ARTICLE_LIKE_FAIL,
  props<{ payload: ErrorData }>(),
);

export const toggleArticleLikeSuccess = createAction(
  TOGGLE_ARTICLE_LIKE_SUCCESS,
  props<{ payload: ArticleLikeResponsePayload }>(),
);

export interface BlogsPayload {
  blogs: BlogArticle[];
}

export interface CommentPayload {
  articleUuid: string;
  commentUuid: string;
  content: string;
}

export interface ArticleUpdateRequestPayload {
  uuid: string;
  title: string;
  content: string;
}

export interface NewBlogArticlePayload {
  title: string;
  content: string;
}

export interface ArticleLikeRequestPayload {
  articleUuid: string;
}

export interface ArticleLikeResponsePayload {
  articleUuid: string;
  like: BlogArticleLike;
}
