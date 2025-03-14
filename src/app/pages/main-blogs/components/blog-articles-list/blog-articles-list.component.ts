import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { BlogArticle } from '../../../_accessories/interfaces/store.interface';
import { identify } from '../../../_accessories/util/util';
import {
  ArticleLikeRequestPayload,
  ArticleUpdateRequestPayload,
} from '../../store/actions';

@Component({
  selector: 'app-blog-articles-list',
  templateUrl: 'blog-articles-list.component.html',
  styleUrls: ['blog-articles-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class BlogArticlesListComponent {
  @Input() blogs: BlogArticle[];
  @Input() isAuthor: boolean;
  @Input() userUuid: string;

  @Output() comment = new EventEmitter<{
    articleId: string;
    comment: string;
  }>();
  @Output() submitArticleEdit = new EventEmitter<ArticleUpdateRequestPayload>();
  @Output() toggleLikeEmitter = new EventEmitter<ArticleLikeRequestPayload>();

  identify = identify;

  onComment(articleId: string, comment: string): void {
    this.comment.emit({
      articleId,
      comment,
    });
  }
}
