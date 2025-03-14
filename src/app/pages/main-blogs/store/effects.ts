import { inject, Injectable } from '@angular/core';
import { BlogUserService } from '../../../services/http/blog-user.service';
import {
  commentBlogArticle,
  commentBlogArticleSuccess,
  CommentPayload,
  loadBlogs,
  loadBlogsSuccess,
} from './actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map } from 'rxjs';
import { Blog } from '../../_accessories/interfaces/store.interface';

@Injectable({
  providedIn: 'root',
})
export class MainBlogsEffects {
  #actions$ = inject(Actions);
  #blogUserService = inject(BlogUserService);

  loadBlogs$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(loadBlogs.type),
      exhaustMap(() => {
        return this.#blogUserService.loadBlogs().pipe(
          map((response: Blog[]) => {
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
}
