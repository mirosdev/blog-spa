import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, of, switchMap, tap } from 'rxjs';
import { CurrentBlogUser } from '../interfaces/store.interface';
import { loadBlogs } from '../../main-blogs/store/actions';
import { selectCurrentBlogUser } from '../../../root-store/reducer';
import { selectLoaded } from '../../main-blogs/store/reducer';

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
    return true;

    // return this.#store.select(selectCurrentBlogUser).pipe(
    //   switchMap((user: CurrentBlogUser | null) => {
    //     if (!!user) {
    //       return this.#store.select(selectLoaded).pipe(
    //         tap((loaded: boolean) => {
    //           if (!loaded && this.#dispatchCount < 3) {
    //             this.#dispatchCount++;
    //             this.#store.dispatch(loadBlogs());
    //           }
    //         }),
    //         filter((loaded: boolean) => !!loaded),
    //       );
    //     } else {
    //       return of(false);
    //     }
    //   }),
    // );
  }
}
