import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  RouterStateSnapshot,
} from '@angular/router';
import { getCurrentBlogUser } from '../../../root-store/selectors';
import { map, tap } from 'rxjs';
import { CurrentBlogUser } from '../interfaces/store.interface';

@Injectable({
  providedIn: 'root',
})
export class NewcomerGuard implements CanActivate {
  #store = inject(Store);
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): MaybeAsync<GuardResult> {
    return this.#store.select(getCurrentBlogUser).pipe(
      tap((user: CurrentBlogUser | null) => {
        if (!!user) {
          // TODO redirect to blog main page
        }
      }),
      map((user: CurrentBlogUser) => !user),
    );
  }
}
