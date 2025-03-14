import { inject, Injectable } from '@angular/core';
import { BlogUserService } from '../../../services/http/blog-user.service';
import {
  ArticleLikeRequestPayload,
  ArticleUpdateRequestPayload,
  commentBlogArticle,
  commentBlogArticleSuccess,
  CommentPayload,
  createArticle,
  createArticleSuccess,
  loadBlogs,
  loadBlogsSuccess,
  NewBlogArticlePayload,
  toggleArticleLike,
  toggleArticleLikeSuccess,
  updateArticle,
  updateArticleSuccess,
} from './actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map } from 'rxjs';
import {
  BlogArticle,
  BlogArticleLike,
} from '../../_accessories/interfaces/store.interface';
import { BlogAuthorService } from '../../../services/http/blog-author.service';

@Injectable({
  providedIn: 'root',
})
export class MainBlogsEffects {
  #actions$ = inject(Actions);
  #blogUserService = inject(BlogUserService);
  #blogAuthorService = inject(BlogAuthorService);

  loadBlogs$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(loadBlogs.type),
      exhaustMap(() => {
        return this.#blogUserService.loadBlogs().pipe(
          map((response: BlogArticle[]) => {
            return loadBlogsSuccess({
              payload: {
                blogs: response,
              },
            });
          }),
        );
      }),
    ),
  );

  commentBlogArticle$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(commentBlogArticle.type),
      exhaustMap((action: { payload: CommentPayload }) => {
        return this.#blogUserService.commentBlogArticle(action.payload).pipe(
          map((response: { uuid: string; comment: string }) => {
            return commentBlogArticleSuccess({
              payload: {
                ...action.payload,
                commentUuid: response.uuid,
              },
            });
          }),
        );
      }),
    ),
  );

  updateArticle$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(updateArticle.type),
      exhaustMap((action: { payload: ArticleUpdateRequestPayload }) => {
        return this.#blogAuthorService.updateArticle(action.payload).pipe(
          map((response: BlogArticle) => {
            return updateArticleSuccess({
              payload: response,
            });
          }),
        );
      }),
    ),
  );

  createArticle$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(createArticle.type),
      exhaustMap((action: { payload: NewBlogArticlePayload }) => {
        return this.#blogAuthorService.createArticle(action.payload).pipe(
          map((response: BlogArticle) => {
            return createArticleSuccess({
              payload: response,
            });
          }),
        );
      }),
    ),
  );

  toggleArticleLike$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(toggleArticleLike.type),
      exhaustMap((action: { payload: ArticleLikeRequestPayload }) => {
        return this.#blogUserService.toggleArticleLike(action.payload).pipe(
          map((response: BlogArticleLike) => {
            return toggleArticleLikeSuccess({
              payload: {
                articleUuid: action.payload.articleUuid,
                like: response,
              },
            });
          }),
        );
      }),
    ),
  );
}
