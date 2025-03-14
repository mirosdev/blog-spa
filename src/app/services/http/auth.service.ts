import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  LoginPayload,
  RegisterPayload,
  UsernameAvailabilityRequestPayload,
} from '../../root-store/actions';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  #httpClient = inject(HttpClient);
  #apiAuth = '/api/auth';
  login(payload: LoginPayload): Observable<{ token: string }> {
    return this.#httpClient.post<{ token: string }>(
      `${environment.apiUrl}${this.#apiAuth}/login`,
      payload,
    );
  }
  register(payload: RegisterPayload): Observable<{ token: string }> {
    return this.#httpClient.post<{ token: string }>(
      `${environment.apiUrl}${this.#apiAuth}/register`,
      payload,
    );
  }
  checkUsernameAvailability(
    payload: UsernameAvailabilityRequestPayload,
  ): Observable<{ available: boolean }> {
    return this.#httpClient.post<{
      available: boolean;
    }>(`${environment.apiUrl}${this.#apiAuth}/username-check`, payload);
  }
}
