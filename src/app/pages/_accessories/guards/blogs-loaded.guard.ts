import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { getCurrentBlogUser } from '../../../root-store/selectors';
import { filter, of, switchMap, tap } from 'rxjs';
import { CurrentBlogUser } from '../interfaces/store.interface';
import { getMainBlogsLoaded } from '../../main-blogs/store/selectors';
import { loadBlogs } from '../../main-blogs/store/actions';

@Injectable({
  providedIn: 'root',
})
export class BlogsLoadedGuard implements CanActivate {
  #store = inject(Store);
  #dispatchCount = 0;
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): MaybeAsync<GuardResult> {
    return this.#store.select(getCurrentBlogUser).pipe(
      switchMap((user: CurrentBlogUser | null) => {
        if (!!user) {
          return this.#store.select(getMainBlogsLoaded).pipe(
            tap((loaded: boolean) => {
              if (!loaded && this.#dispatchCount < 3) {
                this.#dispatchCount++;
                this.#store.dispatch(loadBlogs());
              }
            }),
            filter((loaded: boolean) => !!loaded),
          );
        } else {
          return of(false);
        }
      }),
    );
  }
}
