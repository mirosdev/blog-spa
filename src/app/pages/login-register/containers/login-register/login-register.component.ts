import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  checkUsernameAvailability,
  login,
  LoginPayload,
  register,
  RegisterPayload,
  UsernameAvailabilityRequestPayload,
} from '../../../../root-store/actions';
import { toSignal } from '@angular/core/rxjs-interop';
import { selectUsernameAvailability } from '../../../../root-store/reducer';
import { UsernameAvailability } from '../../../_accessories/interfaces/store.interface';

@Component({
  selector: 'app-login-register',
  templateUrl: 'login-register.component.html',
  styleUrls: ['login-register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class LoginRegisterComponent {
  #store = inject(Store);

  usernameAvailability = toSignal<UsernameAvailability | null>(
    this.#store.select(selectUsernameAvailability),
  );

  login(payload: LoginPayload): void {
    this.#store.dispatch(
      login({
        payload,
      }),
    );
  }

  register(payload: RegisterPayload): void {
    this.#store.dispatch(
      register({
        payload,
      }),
    );
  }

  checkUsernameAvailability(payload: UsernameAvailabilityRequestPayload): void {
    this.#store.dispatch(
      checkUsernameAvailability({
        payload,
      }),
    );
  }
}
