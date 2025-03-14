import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  Blog,
  CurrentBlogUser,
} from '../../../_accessories/interfaces/store.interface';
import { selectBlogs } from '../../store/reducer';
import {
  ArticleUpdateRequestPayload,
  commentBlogArticle,
  createArticle,
  NewBlogArticlePayload,
  updateArticle,
} from '../../store/actions';
import { selectCurrentBlogUser } from '../../../../root-store/reducer';
import { map } from 'rxjs';
import { PRIVILEGE } from '../../../_accessories/enums/user-privileges';

@Component({
  selector: 'app-main-blogs',
  templateUrl: 'main-blogs.component.html',
  styleUrls: ['main-blogs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class MainBlogsComponent {
  #store = inject(Store);

  blogs = toSignal<Blog[]>(this.#store.select(selectBlogs));

  isAuthor = toSignal<boolean | null>(
    this.#store.select(selectCurrentBlogUser).pipe(
      map((user: CurrentBlogUser) => {
        if (!user) {
          return null;
        } else if (
          user &&
          user.privileges &&
          user.privileges.includes(PRIVILEGE.AUTHOR_PRIVILEGE)
        ) {
          return true;
        }
        return false;
      }),
    ),
  );

  onComment(payload: { articleId: string; comment: string }): void {
    this.#store.dispatch(
      commentBlogArticle({
        payload: {
          articleUuid: payload.articleId,
          content: payload.comment,
          commentUuid: undefined,
        },
      }),
    );
  }

  submitArticleEdit(payload: ArticleUpdateRequestPayload): void {
    this.#store.dispatch(
      updateArticle({
        payload,
      }),
    );
  }

  submitNewArticle(payload: NewBlogArticlePayload): void {
    this.#store.dispatch(
      createArticle({
        payload,
      }),
    );
  }
}
