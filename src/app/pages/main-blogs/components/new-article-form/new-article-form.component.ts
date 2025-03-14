import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Output,
  signal,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { fadeIn } from '../../../_accessories/animations';
import { NewBlogArticlePayload } from '../../store/actions';

@Component({
  selector: 'app-new-article-form',
  templateUrl: 'new-article-form.component.html',
  styleUrls: ['new-article-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
  animations: [fadeIn],
})
export class NewArticleFormComponent {
  @Output() newBlogArticle = new EventEmitter<NewBlogArticlePayload>();

  createModeOn = signal<boolean>(false);

  #fb = inject(FormBuilder);

  form = this.#fb.group({
    title: ['', Validators.required],
    content: ['', Validators.required],
  });

  submitNewBlogArticle(): void {
    this.newBlogArticle.emit({
      title: this.form.get('title').value,
      content: this.form.get('content').value,
    });
    this.createModeOn.set(false);
    this.form.get('title').setValue('');
    this.form.get('content').setValue('');
  }

  openCreateBlogArticle(): void {
    this.createModeOn.set(true);
  }

  closeCreateBlogArticle(): void {
    this.createModeOn.set(false);
  }
}
