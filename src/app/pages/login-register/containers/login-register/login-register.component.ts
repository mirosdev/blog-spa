import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { login, LoginPayload } from '../../../../root-store/actions';

@Component({
  selector: 'app-login-register',
  templateUrl: 'login-register.component.html',
  styleUrls: ['login-register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class LoginRegisterComponent {
  #store = inject(Store);

  login(payload: LoginPayload): void {
    this.#store.dispatch(
      login({
        payload,
      }),
    );
  }
}
