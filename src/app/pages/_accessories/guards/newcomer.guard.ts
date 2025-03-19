import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { filter, map, of, switchMap, tap } from 'rxjs';
import { CurrentBlogUser } from '../interfaces/store.interface';
import { APP_ROUTES } from '../main-routes';
import { selectCurrentBlogUser } from '../../../root-store/reducer';
import { AppUiService } from '../../../services/ui/appUiService';

@Injectable({
  providedIn: 'root',
})
export class NewcomerGuard implements CanActivate {
  #store = inject(Store);
  #router = inject(Router);
  #appUiService = inject(AppUiService);
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): MaybeAsync<GuardResult> {
    return this.#appUiService.authCheckDone().pipe(
      filter((done: boolean) => !!done),
      switchMap(() => {
        return this.#store.select(selectCurrentBlogUser).pipe(
          tap((user: CurrentBlogUser | null) => {
            if (!!user) {
              this.#router.navigate([APP_ROUTES.MAIN_BLOGS]);
            }
          }),
          map((user: CurrentBlogUser) => !user),
        );
      }),
    );
  }
}
