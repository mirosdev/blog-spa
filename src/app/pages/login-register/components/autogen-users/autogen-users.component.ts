import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';
import { BehaviorSubject, debounceTime, filter, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fadeInOut } from '../../../_accessories/animations';

@Component({
  selector: 'app-autogen-users',
  templateUrl: 'autogen-users.component.html',
  styleUrls: ['autogen-users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInOut],
  standalone: false,
})
export class AutogenUsersComponent implements AfterViewInit {
  #destroyRef = inject(DestroyRef);

  clipboardContent$ = new BehaviorSubject<string>(null);

  ngAfterViewInit(): void {
    this.clipboardContent$
      .pipe(
        filter((value) => !!value),
        debounceTime(2000),
        tap(() => {
          this.clipboardContent$.next(null);
        }),
        takeUntilDestroyed(this.#destroyRef),
      )
      .subscribe();
  }

  copyToClipboard(text: string): void {
    this.clipboardContent$.next(text);
    navigator.clipboard.writeText(text);
  }
}
