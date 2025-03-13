import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Blog } from '../../pages/_accessories/interfaces/store.interface';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class BlogUserService {
  #httpClient = inject(HttpClient);
  #apiData = '/api/data';
  loadBlogs() {
    return this.#httpClient.get<Blog[]>(
      `${environment.apiUrl}${this.#apiData}/blogs`,
    );
  }
}
