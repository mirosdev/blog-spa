import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { Blog } from '../../../_accessories/interfaces/store.interface';
import { selectBlogs } from '../../store/reducer';
import { commentBlogArticle } from '../../store/actions';

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
}
