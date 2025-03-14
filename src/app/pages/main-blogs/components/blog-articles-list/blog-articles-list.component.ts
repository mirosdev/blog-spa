import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Blog } from '../../../_accessories/interfaces/store.interface';
import { identify } from '../../../_accessories/util/util';
import { ArticleUpdateRequestPayload } from '../../store/actions';

@Component({
  selector: 'app-blog-articles-list',
  templateUrl: 'blog-articles-list.component.html',
  styleUrls: ['blog-articles-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class BlogArticlesListComponent {
  @Input() blogs: Blog[];
  @Input() isAuthor: boolean;

  @Output() comment = new EventEmitter<{
    articleId: string;
    comment: string;
  }>();
  @Output() submitArticleEdit = new EventEmitter<ArticleUpdateRequestPayload>();

  identify = identify;

  onComment(articleId: string, comment: string): void {
    this.comment.emit({
      articleId,
      comment,
    });
  }
}
