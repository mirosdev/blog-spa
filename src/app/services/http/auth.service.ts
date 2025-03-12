import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginPayload } from '../../root-store/actions';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  #httpClient = inject(HttpClient);
  private apiAuth = '/api/auth';
  login(payload: LoginPayload): Observable<{ token: string }> {
    return this.#httpClient.post<{ token: string }>(
      `${environment.apiUrl}${this.apiAuth}/login`,
      payload,
    );
  }
}
