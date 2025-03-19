import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BlogArticle,
  BlogArticleLike,
} from '../../pages/_accessories/interfaces/store.interface';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import {
  ArticleLikeRequestPayload,
  CommentPayload,
} from '../../pages/main-blogs/store/actions';

@Injectable({ providedIn: 'root' })
export class BlogUserService {
  #httpClient = inject(HttpClient);
  #apiData = '/api/data';
  loadBlogs(): Observable<BlogArticle[]> {
    return this.#httpClient.get<BlogArticle[]>(
      `${environment.apiUrl}${this.#apiData}/article`,
      {
        withCredentials: true,
      },
    );
  }
  commentBlogArticle(
    payload: CommentPayload,
  ): Observable<{ uuid: string; comment: string }> {
    return this.#httpClient.post<{
      uuid: string;
      comment: string;
    }>(`${environment.apiUrl}${this.#apiData}/comment`, payload, {
      withCredentials: true,
    });
  }
  toggleArticleLike(
    payload: ArticleLikeRequestPayload,
  ): Observable<BlogArticleLike> {
    return this.#httpClient.post<BlogArticleLike>(
      `${environment.apiUrl}${this.#apiData}/like`,
      payload,
      {
        withCredentials: true,
      },
    );
  }
}
