import { createAction, props } from '@ngrx/store';
import { Blog, ErrorData } from '../../_accessories/interfaces/store.interface';

const LOAD_BLOGS = '[MainBlogsFeatureState] Load Blogs';
const LOAD_BLOGS_FAIL = '[MainBlogsFeatureState] Load Blogs Fail';
const LOAD_BLOGS_SUCCESS = '[MainBlogsFeatureState] Load Blogs Success';

export const loadBlogs = createAction(LOAD_BLOGS);

export const loadBlogsFail = createAction(
  LOAD_BLOGS_FAIL,
  props<{ payload: ErrorData }>(),
);

export const loadBlogsSuccess = createAction(
  LOAD_BLOGS_SUCCESS,
  props<{ payload: BlogsPayload }>(),
);

export interface BlogsPayload {
  blogs: Blog[];
}
