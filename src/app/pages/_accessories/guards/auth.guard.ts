import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  RouterStateSnapshot,
} from '@angular/router';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { getCurrentBlogUser } from '../../../root-store/selectors';
import { map, tap } from 'rxjs';
import { CurrentBlogUser } from '../interfaces/store.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  #store = inject(Store);
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): MaybeAsync<GuardResult> {
    return this.#store.select(getCurrentBlogUser).pipe(
      tap((user: CurrentBlogUser | null) => {
        if (!user) {
          // TODO redirect to login/register page
        }
      }),
      map((user: CurrentBlogUser) => !!user),
    );
  }
}
