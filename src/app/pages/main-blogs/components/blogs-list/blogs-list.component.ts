import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Blog } from '../../../_accessories/interfaces/store.interface';
import { identify } from '../../../_accessories/util/util';

@Component({
  selector: 'app-blogs-list',
  templateUrl: 'blogs-list.component.html',
  styleUrls: ['blogs-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class BlogsListComponent {
  @Input() blogs: Blog[];

  @Output() comment = new EventEmitter<{
    articleId: string;
    comment: string;
  }>();

  identify = identify;

  onComment(articleId: string, comment: string): void {
    this.comment.emit({
      articleId,
      comment,
    });
  }
}
