import { PRIVILEGE } from '../enums/user-privileges';

export interface ErrorData {
  message: string;
  code: number;
}

export interface CurrentBlogUser {
  id: string;
  firstName: string;
  lastName: string;
  privileges: PRIVILEGE[];
}

export interface Blog {
  id: string;
  title: string;
  content: string;
  comments: BlogComment[];
  likes: BlogLike[];
}

export interface BlogComment {
  id: string;
  content: string;
}

export interface BlogLike {
  id: string;
}
