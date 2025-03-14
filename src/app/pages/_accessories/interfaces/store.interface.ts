import { PRIVILEGE } from '../enums/user-privileges';

export interface ErrorData {
  message: string;
  code: number;
}

export interface CurrentBlogUser {
  uuid: string;
  email: string;
  firstName: string;
  lastName: string;
  privileges: PRIVILEGE[];
}

export interface BlogArticle {
  uuid: string;
  title: string;
  content: string;
  comments: BlogArticleComment[];
  likes: BlogArticleLike[];
}

export interface BlogArticleComment {
  uuid: string;
  content: string;
}

export interface BlogArticleLike {
  uuid: string;
  blogUserUuid: string;
}

export interface UsernameAvailability {
  available: boolean;
}
