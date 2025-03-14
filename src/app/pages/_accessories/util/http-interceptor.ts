import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { AppEffects } from '../../../root-store/effects';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const authToken = inject(AppEffects).token;
  const newReq = req.clone({
    headers: req.headers.append(
      'Authorization',
      !!authToken ? 'Bearer ' + authToken : '',
    ),
  });
  return next(newReq);
}
