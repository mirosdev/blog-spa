import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-main-blogs',
  templateUrl: 'main-blogs.component.html',
  styleUrls: ['main-blogs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class MainBlogsComponent {}
