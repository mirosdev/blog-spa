import { createAction, props } from '@ngrx/store';
import { Blog, ErrorData } from '../../_accessories/interfaces/store.interface';

const LOAD_BLOGS = '[MainBlogsFeatureState] Load Blogs';
const LOAD_BLOGS_FAIL = '[MainBlogsFeatureState] Load Blogs Fail';
const LOAD_BLOGS_SUCCESS = '[MainBlogsFeatureState] Load Blogs Success';
const COMMENT_BLOG_ARTICLE = '[MainBlogsFeatureState] Comment Blog Article';
const COMMENT_BLOG_ARTICLE_FAIL =
  '[MainBlogsFeatureState] Comment Blog Article Fail';
const COMMENT_BLOG_ARTICLE_SUCCESS =
  '[MainBlogsFeatureState] Comment Blog Article Success';

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

export interface BlogsPayload {
  blogs: Blog[];
}

export interface CommentPayload {
  articleUuid: string;
  commentUuid: string;
  content: string;
}
