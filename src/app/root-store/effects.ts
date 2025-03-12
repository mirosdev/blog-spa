import { inject, Injectable } from '@angular/core';
import { checkToken, login, LoginPayload, loginSuccess } from './actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../services/http/auth.service';
import { exhaustMap, map, tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LOCAL_STORAGE_TOKEN } from '../pages/_accessories/enums/user-privileges';
import { Store } from '@ngrx/store';

@Injectable()
export class AppEffects {
  #actions$ = inject(Actions);
  #authService = inject(AuthService);
  #jwtHelper = new JwtHelperService();
  #store = inject(Store);

  login$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(login.type),
      exhaustMap((action: { payload: LoginPayload }) => {
        return this.#authService.login(action.payload).pipe(
          map((response: { token: string }) => {
            localStorage.setItem(
              LOCAL_STORAGE_TOKEN,
              JSON.stringify(response.token),
            );
            const tokenClaims = this.#jwtHelper.decodeToken(response.token);
            return loginSuccess({
              payload: {
                currentBlogUser: {
                  id: tokenClaims.uuid,
                  email: tokenClaims.email,
                  firstName: tokenClaims.firstName,
                  lastName: tokenClaims.lastName,
                  privileges: tokenClaims.authorities,
                },
              },
            });
          }),
        );
      }),
    ),
  );

  checkToken$ = createEffect(
    () =>
      this.#actions$.pipe(
        ofType(checkToken.type),
        tap(() => {
          const token: string = localStorage.getItem(LOCAL_STORAGE_TOKEN);
          if (token && !this.#jwtHelper.isTokenExpired(token)) {
            const tokenClaims = this.#jwtHelper.decodeToken(token);
            this.#store.dispatch(
              loginSuccess({
                payload: {
                  currentBlogUser: {
                    id: tokenClaims?.uuid,
                    email: tokenClaims?.email,
                    firstName: tokenClaims?.firstName,
                    lastName: tokenClaims?.lastName,
                    privileges: tokenClaims?.authorities,
                  },
                },
              }),
            );
          }
        }),
      ),
    { dispatch: false },
  );
}
