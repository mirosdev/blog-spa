import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Blog } from '../../../_accessories/interfaces/store.interface';

@Component({
  selector: 'app-blog',
  templateUrl: 'blog.component.html',
  styleUrls: ['blog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class BlogComponent {
  @Input() blog: Blog;
}
