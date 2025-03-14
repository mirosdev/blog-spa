import { inject, Injectable } from '@angular/core';
import {
  checkToken,
  clearUserState,
  login,
  LoginPayload,
  loginSuccess,
  logout,
  register,
  RegisterPayload,
} from './actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../services/http/auth.service';
import { exhaustMap, map, tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import {
  LOCAL_STORAGE_TOKEN,
  PRIVILEGE,
} from '../pages/_accessories/enums/user-privileges';
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

  token: string = null;

  login$ = createEffect(
    () =>
      this.#actions$.pipe(
        ofType(login.type),
        tap((action: { payload: LoginPayload }) => {
          this.#authService
            .login(action.payload)
            .pipe(
              map((response: { token: string }) => {
                this.afterLoginSuccess(response);
              }),
            )
            .subscribe();
        }),
      ),
    { dispatch: false },
  );

  register$ = createEffect(
    () =>
      this.#actions$.pipe(
        ofType(register.type),
        tap((action: { payload: RegisterPayload }) => {
          this.#authService
            .register(action.payload)
            .pipe(
              map((response: { token: string }) => {
                this.afterLoginSuccess(response);
              }),
            )
            .subscribe();
        }),
      ),
    { dispatch: false },
  );

  private afterLoginSuccess(response: { token: string }): void {
    this.token = response.token;
    localStorage.setItem(LOCAL_STORAGE_TOKEN, response.token);
    const tokenClaims = this.#jwtHelper.decodeToken(response.token);
    this.#store.dispatch(
      loginSuccess({
        payload: {
          currentBlogUser: {
            uuid: tokenClaims.uuid,
            email: tokenClaims.email,
            firstName: tokenClaims.firstName,
            lastName: tokenClaims.lastName,
            privileges: (
              tokenClaims.authorities as { authority: string }[]
            ).map((privilege) => {
              return privilege.authority as PRIVILEGE;
            }),
          },
        },
      }),
    );
    this.#router.navigate([APP_ROUTES.MAIN_BLOGS]);
  }

  checkToken$ = createEffect(
    () =>
      this.#actions$.pipe(
        ofType(checkToken.type),
        tap(() => {
          const token: string = localStorage.getItem(LOCAL_STORAGE_TOKEN);
          if (token && !this.#jwtHelper.isTokenExpired(token)) {
            this.token = token;
            const tokenClaims = this.#jwtHelper.decodeToken(token);
            this.#store.dispatch(
              loginSuccess({
                payload: {
                  currentBlogUser: {
                    uuid: tokenClaims?.uuid,
                    email: tokenClaims?.email,
                    firstName: tokenClaims?.firstName,
                    lastName: tokenClaims?.lastName,
                    privileges: (
                      tokenClaims.authorities as { authority: string }[]
                    ).map((privilege) => {
                      return privilege.authority as PRIVILEGE;
                    }),
                  },
                },
              }),
            );
          } else if (token) {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN);
            this.#store.dispatch(clearUserState());
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
          this.#store.dispatch(clearUserState());
          this.#router.navigate([APP_ROUTES.LOGIN_REGISTER]);
        }),
      ),
    { dispatch: false },
  );
}
