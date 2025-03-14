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

export interface Blog {
  uuid: string;
  title: string;
  content: string;
  comments: BlogComment[];
  likes: BlogLike[];
}

export interface BlogComment {
  uuid: string;
  content: string;
}

export interface BlogLike {
  uuid: string;
}
