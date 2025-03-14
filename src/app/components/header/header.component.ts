import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCurrentBlogUser } from '../../root-store/reducer';
import { toSignal } from '@angular/core/rxjs-interop';
import { CurrentBlogUser } from '../../pages/_accessories/interfaces/store.interface';
import { logout } from '../../root-store/actions';
import { map } from 'rxjs';
import { PRIVILEGE } from '../../pages/_accessories/enums/user-privileges';

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
  isAuthor = toSignal<boolean | null>(
    this.#store.select(selectCurrentBlogUser).pipe(
      map((user: CurrentBlogUser) => {
        if (!user) {
          return null;
        } else if (
          user &&
          user.privileges &&
          user.privileges.includes(PRIVILEGE.AUTHOR_PRIVILEGE)
        ) {
          return true;
        }
        return false;
      }),
    ),
  );

  logout(): void {
    this.#store.dispatch(logout());
  }
}
