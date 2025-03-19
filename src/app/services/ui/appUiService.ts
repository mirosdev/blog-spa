import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppUiService {
  initIsAuthenticatedCheckDone$ = new BehaviorSubject<boolean>(false);

  authCheckDone(): Observable<boolean> {
    return this.initIsAuthenticatedCheckDone$.asObservable();
  }

  setAuthCheckDone(): void {
    this.initIsAuthenticatedCheckDone$.next(true);
  }
}
