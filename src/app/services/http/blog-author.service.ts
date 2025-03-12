import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BlogAuthorService {
  #httpClient = inject(HttpClient);
  apiAuthor = '/api/author';
}
