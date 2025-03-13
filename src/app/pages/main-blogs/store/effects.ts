import { inject, Injectable } from '@angular/core';
import { BlogUserService } from '../../../services/http/blog-user.service';
import { loadBlogs } from './actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MainBlogsEffects {
  #actions$ = inject(Actions);
  #blogUserService = inject(BlogUserService);

  // loadBlogs$ = createEffect(() =>
  //   this.#actions$.pipe(
  //     ofType(loadBlogs.type),
  //     exhaustMap(() => {
  //       return this.#blogUserService.loadBlogs().pipe(
  //         map((response: ) => {
  //
  //         })
  //       );
  //     }),
  //   ),
  // );
}
