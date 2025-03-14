import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  signal,
} from '@angular/core';
import {
  BlogArticle,
  BlogArticleLike,
} from '../../../_accessories/interfaces/store.interface';
import { fadeIn } from '../../../_accessories/animations';
import { FormBuilder, Validators } from '@angular/forms';
import {
  ArticleLikeRequestPayload,
  ArticleUpdateRequestPayload,
} from '../../store/actions';

@Component({
  selector: 'app-blog-article',
  templateUrl: 'blog-article.component.html',
  styleUrls: ['blog-article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
  animations: [fadeIn],
})
export class BlogArticleComponent implements AfterViewInit {
  @Input() blog: BlogArticle;
  @Input() isAuthor: boolean;
  @Input() userUuid: string;

  @Output() submitArticleEdit = new EventEmitter<ArticleUpdateRequestPayload>();
  @Output() toggleLikeEmitter = new EventEmitter<ArticleLikeRequestPayload>();

  #fb = inject(FormBuilder);

  form = this.#fb.group({
    title: ['', Validators.required],
    content: ['', Validators.required],
  });

  editModeOn = signal<boolean>(false);
  userHasLikedThisBlog = signal<boolean>(false);

  ngAfterViewInit(): void {
    this.setInitialFormState();
    if (this.blog && this.blog.likes && this.blog.likes.length > 0) {
      this.userHasLikedThisBlog.set(
        this.blog.likes.some(
          (like: BlogArticleLike) => like.blogUserUuid === this.userUuid,
        ),
      );
    }
  }

  submitBlogChanges(): void {
    if (this.form.valid) {
      this.submitArticleEdit.emit({
        uuid: this.blog.uuid,
        title: this.form.get('title').value,
        content: this.form.get('content').value,
      });
      this.editModeOn.set(false);
    }
  }

  openEditBlog(): void {
    this.editModeOn.set(true);
  }

  closeEditBlog(): void {
    this.editModeOn.set(false);
    this.setInitialFormState();
  }

  setInitialFormState(): void {
    if (this.blog && this.blog.title && this.blog.content) {
      this.form.get('title').setValue(this.blog.title);
      this.form.get('content').setValue(this.blog.content);
    }
  }

  toggleLike(): void {
    this.userHasLikedThisBlog.set(!this.userHasLikedThisBlog());
    this.toggleLikeEmitter.emit({
      articleUuid: this.blog.uuid,
    });
  }
}
