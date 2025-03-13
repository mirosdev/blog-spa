import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Output,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginPayload } from '../../../../root-store/actions';
import { getUuidsArr } from '../../../_accessories/util/generate';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class LoginComponent {
  @Output() login: EventEmitter<LoginPayload> = new EventEmitter();

  labelIds = getUuidsArr(2);

  #fb = inject(FormBuilder);

  form = this.#fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit(): void {
    this.form.get('username').markAsDirty();
    this.form.get('password').markAsDirty();
    this.login.emit({
      username: this.form.get('username').value,
      password: this.form.get('password').value,
    });
  }
}
