import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Output,
  signal,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { getUuidsArr } from '../../../_accessories/util/generate';
import { RegisterPayload } from '../../../../root-store/actions';

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class RegisterComponent {
  @Output() register: EventEmitter<RegisterPayload> = new EventEmitter();

  #fb = inject(FormBuilder);

  labelIds = getUuidsArr(5);

  form = this.#fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
  });

  pwComparisonErr = signal<boolean>(false);
  comparePwFocusOut = false;

  comparePasswords(isInputEvent = false): void {
    if (
      (isInputEvent && this.comparePwFocusOut) ||
      (!isInputEvent && !this.comparePwFocusOut)
    ) {
      if (
        this.form.get('password').value !==
        this.form.get('confirmPassword').value
      ) {
        this.pwComparisonErr.set(true);
      } else {
        this.pwComparisonErr.set(false);
      }
    }
    if (!isInputEvent && !this.comparePwFocusOut) {
      this.comparePwFocusOut = true;
    }
  }

  onSubmit(): void {
    this.comparePasswords();
    this.form.get('username').markAsDirty();
    this.form.get('password').markAsDirty();
    this.form.get('confirmPassword').markAsDirty();
    this.form.get('firstName').markAsDirty();
    this.form.get('lastName').markAsDirty();
    if (this.form.valid && !this.pwComparisonErr()) {
      this.register.emit({
        username: this.form.get('username').value,
        password: this.form.get('password').value,
        firstName: this.form.get('firstName').value,
        lastName: this.form.get('lastName').value,
      });
    }
  }
}
