import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import {
  BlogArticleComment,
  BlogArticleLike,
} from '../../../_accessories/interfaces/store.interface';
import { FormBuilder, Validators } from '@angular/forms';
import { getUuid } from '../../../_accessories/util/generate';
import { identify } from '../../../_accessories/util/util';

@Component({
  selector: 'app-blog-article-comments',
  templateUrl: 'blog-article-comments.component.html',
  styleUrls: ['blog-article-comments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class BlogArticleCommentsComponent {
  @Input() comments: BlogArticleComment[];
  @Input() likes: BlogArticleLike[];

  @Output() comment = new EventEmitter<string>();

  labelId = getUuid();
  identify = identify;

  #fb = inject(FormBuilder);

  form = this.#fb.group({
    comment: ['', [Validators.required]],
  });

  commentSubmit(): void {
    this.form.get('comment').markAsTouched();
    this.form.get('comment').markAsDirty();
    if (this.form.get('comment').valid) {
      this.comment.emit(this.form.get('comment').value);
      this.form.get('comment').setValue('');
      this.form.get('comment').setErrors(null);
    }
  }
}
