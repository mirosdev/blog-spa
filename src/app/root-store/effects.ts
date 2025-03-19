import { inject, Injectable } from '@angular/core';
import {
  isAuthenticated,
  checkUsernameAvailability,
  checkUsernameAvailabilitySuccess,
  clearUserState,
  login,
  LoginPayload,
  setUserData,
  logout,
  register,
  RegisterPayload,
  UsernameAvailabilityRequestPayload,
  BlogUserDto,
} from './actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../services/http/auth.service';
import {
  catchError,
  exhaustMap,
  filter,
  map,
  of,
  switchMap,
  tap,
  timer,
} from 'rxjs';
import { PRIVILEGE } from '../pages/_accessories/enums/user-privileges';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { APP_ROUTES } from '../pages/_accessories/main-routes';
import { AppUiService } from '../services/ui/appUiService';

@Injectable()
export class AppEffects {
  #actions$ = inject(Actions);
  #authService = inject(AuthService);
  #store = inject(Store);
  #router = inject(Router);
  #appUiService = inject(AppUiService);

  login$ = createEffect(
    () =>
      this.#actions$.pipe(
        ofType(login.type),
        tap((action: { payload: LoginPayload }) => {
          this.#authService
            .login(action.payload)
            .pipe(
              map((response: BlogUserDto) => {
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
              map((response: BlogUserDto) => {
                this.afterLoginSuccess(response);
              }),
            )
            .subscribe();
        }),
      ),
    { dispatch: false },
  );

  checkUsernameAvailability$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(checkUsernameAvailability.type),
      switchMap((action: { payload: UsernameAvailabilityRequestPayload }) => {
        return this.#authService.checkUsernameAvailability(action.payload).pipe(
          map((response: { available: boolean }) => {
            return checkUsernameAvailabilitySuccess({
              payload: {
                available: response.available,
              },
            });
          }),
        );
      }),
    ),
  );

  private afterLoginSuccess(blogUser: BlogUserDto): void {
    this.#store.dispatch(
      setUserData({
        payload: {
          currentBlogUser: {
            uuid: blogUser.uuid,
            email: blogUser.email,
            firstName: blogUser.firstName,
            lastName: blogUser.lastName,
            privileges: blogUser.authorities.map((privilege) => {
              return privilege.authority as PRIVILEGE;
            }),
          },
        },
      }),
    );
    this.#router.navigate([APP_ROUTES.MAIN_BLOGS]);
  }

  isAuthenticated$ = createEffect(
    () =>
      this.#actions$.pipe(
        ofType(isAuthenticated.type),
        tap(() => {
          this.#authService
            .isAuthenticated()
            .pipe(
              catchError(() => of(null)),
              tap((response: BlogUserDto) => {
                if (!!response) {
                  this.#store.dispatch(
                    setUserData({
                      payload: {
                        currentBlogUser: {
                          uuid: response.uuid,
                          email: response.email,
                          firstName: response.firstName,
                          lastName: response.lastName,
                          privileges: response.authorities.map((privilege) => {
                            return privilege.authority as PRIVILEGE;
                          }),
                        },
                      },
                    }),
                  );
                } else {
                  this.#store.dispatch(clearUserState());
                }
                if (
                  !this.#appUiService.initIsAuthenticatedCheckDone$.getValue()
                ) {
                  this.#appUiService.setAuthCheckDone();
                }
              }),
            )
            .subscribe();
        }),
      ),
    { dispatch: false },
  );

  logout$ = createEffect(
    () =>
      this.#actions$.pipe(
        ofType(logout.type),
        tap(() => {
          this.#authService
            .logout()
            .pipe(
              tap(() => {
                this.#store.dispatch(clearUserState());
                this.#router.navigate([APP_ROUTES.LOGIN_REGISTER]);
              }),
            )
            .subscribe();
        }),
      ),
    { dispatch: false },
  );
}
