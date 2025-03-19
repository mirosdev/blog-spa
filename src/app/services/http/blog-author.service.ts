import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  ArticleUpdateRequestPayload,
  NewBlogArticlePayload,
} from '../../pages/main-blogs/store/actions';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BlogArticle } from '../../pages/_accessories/interfaces/store.interface';

@Injectable({
  providedIn: 'root',
})
export class BlogAuthorService {
  #httpClient = inject(HttpClient);
  #apiAuthor = '/api/author';
  updateArticle(payload: ArticleUpdateRequestPayload): Observable<any> {
    return this.#httpClient.put<any>(
      `${environment.apiUrl}${this.#apiAuthor}/article`,
      payload,
      {
        withCredentials: true,
      },
    );
  }
  createArticle(payload: NewBlogArticlePayload): Observable<BlogArticle> {
    return this.#httpClient.post<BlogArticle>(
      `${environment.apiUrl}${this.#apiAuthor}/article`,
      payload,
      {
        withCredentials: true,
      },
    );
  }
}
