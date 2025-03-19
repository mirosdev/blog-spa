import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BlogUserDto,
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
  login(payload: LoginPayload): Observable<BlogUserDto> {
    return this.#httpClient.post<BlogUserDto>(
      `${environment.apiUrl}${this.#apiAuth}/login`,
      payload,
    );
  }
  register(payload: RegisterPayload): Observable<BlogUserDto> {
    return this.#httpClient.post<BlogUserDto>(
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
  isAuthenticated(): Observable<BlogUserDto> {
    return this.#httpClient.get<BlogUserDto>(
      `${environment.apiUrl}${this.#apiAuth}/is-authenticated`,
    );
  }
  logout(): Observable<void> {
    return this.#httpClient.post<void>(
      `${environment.apiUrl}${this.#apiAuth}/logout`,
      {},
    );
  }
}
