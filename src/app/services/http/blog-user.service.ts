import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Blog } from '../../pages/_accessories/interfaces/store.interface';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { CommentPayload } from '../../pages/main-blogs/store/actions';

@Injectable({ providedIn: 'root' })
export class BlogUserService {
  #httpClient = inject(HttpClient);
  #apiData = '/api/data';
  loadBlogs(): Observable<Blog[]> {
    return this.#httpClient.get<Blog[]>(
      `${environment.apiUrl}${this.#apiData}/article`,
    );
  }
  commentBlogArticle(
    payload: CommentPayload,
  ): Observable<{ uuid: string; comment: string }> {
    return this.#httpClient.post<{
      uuid: string;
      comment: string;
    }>(`${environment.apiUrl}${this.#apiData}/comment`, payload);
  }
}
