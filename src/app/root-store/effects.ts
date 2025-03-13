import { inject, Injectable } from '@angular/core';
import {
  checkToken,
  login,
  LoginPayload,
  loginSuccess,
  logout,
} from './actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../services/http/auth.service';
import { map, tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LOCAL_STORAGE_TOKEN } from '../pages/_accessories/enums/user-privileges';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { APP_ROUTES } from '../pages/_accessories/main-routes';

@Injectable()
export class AppEffects {
  #actions$ = inject(Actions);
  #authService = inject(AuthService);
  #jwtHelper = new JwtHelperService();
  #store = inject(Store);
  #router = inject(Router);

  login$ = createEffect(
    () =>
      this.#actions$.pipe(
        ofType(login.type),
        tap((action: { payload: LoginPayload }) => {
          this.#authService
            .login(action.payload)
            .pipe(
              map((response: { token: string }) => {
                localStorage.setItem(
                  LOCAL_STORAGE_TOKEN,
                  JSON.stringify(response.token),
                );
                const tokenClaims = this.#jwtHelper.decodeToken(response.token);
                this.#store.dispatch(
                  loginSuccess({
                    payload: {
                      currentBlogUser: {
                        id: tokenClaims.uuid,
                        email: tokenClaims.email,
                        firstName: tokenClaims.firstName,
                        lastName: tokenClaims.lastName,
                        privileges: tokenClaims.authorities,
                      },
                    },
                  }),
                );
                this.#router.navigate([APP_ROUTES.MAIN_BLOGS]);
              }),
            )
            .subscribe();
        }),
      ),
    { dispatch: false },
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

  logout$ = createEffect(
    () =>
      this.#actions$.pipe(
        ofType(logout.type),
        tap(() => {
          localStorage.removeItem(LOCAL_STORAGE_TOKEN);
          this.#router.navigate([APP_ROUTES.LOGIN_REGISTER]);
        }),
      ),
    { dispatch: false },
  );
}
