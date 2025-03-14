import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  Output,
  signal,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { getUuidsArr } from '../../../_accessories/util/generate';
import {
  RegisterPayload,
  UsernameAvailabilityRequestPayload,
} from '../../../../root-store/actions';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, tap } from 'rxjs';
import { UsernameAvailability } from '../../../_accessories/interfaces/store.interface';

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class RegisterComponent implements AfterViewInit {
  @Input() set setUsernameAvailability(availability: UsernameAvailability) {
    if (!this.usernameAvailabilityLoading()) {
      this.usernameAvailability.set(null);
    } else {
      this.usernameAvailability.set(
        availability ? availability.available : null,
      );
    }
    this.usernameAvailabilityLoading.set(false);
  }
  @Output() register: EventEmitter<RegisterPayload> = new EventEmitter();
  @Output() checkUsername =
    new EventEmitter<UsernameAvailabilityRequestPayload>();

  #fb = inject(FormBuilder);
  #destroyRef = inject(DestroyRef);

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

  usernameAvailability = signal<boolean | null>(null);
  usernameAvailabilityLoading = signal<boolean>(false);

  ngAfterViewInit(): void {
    this.form
      .get('username')
      .valueChanges.pipe(
        tap(() => {
          if (this.form.get('username').value.length > 0) {
            this.usernameAvailabilityLoading.set(true);
          } else {
            this.usernameAvailabilityLoading.set(false);
          }
        }),
        debounceTime(700),
        tap(() => {
          this.checkUsernameAvailability();
        }),
        takeUntilDestroyed(this.#destroyRef),
      )
      .subscribe();
  }

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
    if (
      this.form.valid &&
      !this.pwComparisonErr() &&
      this.usernameAvailability() &&
      !this.usernameAvailabilityLoading()
    ) {
      this.register.emit({
        username: this.form.get('username').value,
        password: this.form.get('password').value,
        firstName: this.form.get('firstName').value,
        lastName: this.form.get('lastName').value,
      });
    }
  }

  private checkUsernameAvailability(): void {
    if (this.form.get('username').value.length > 0) {
      this.checkUsername.emit({
        username: this.form.get('username').value,
      });
    } else {
      this.usernameAvailabilityLoading.set(false);
    }
  }
}
