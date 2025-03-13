import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCurrentBlogUser } from '../../root-store/reducer';
import { toSignal } from '@angular/core/rxjs-interop';
import { CurrentBlogUser } from '../../pages/_accessories/interfaces/store.interface';
import { logout } from '../../root-store/actions';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class HeaderComponent {
  #store = inject(Store);

  currentBlogUser = toSignal<CurrentBlogUser>(
    this.#store.select(selectCurrentBlogUser),
  );

  logout(): void {
    this.#store.dispatch(logout());
  }
}
