import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-login-register',
  templateUrl: 'login-register.component.html',
  styleUrls: ['login-register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class LoginRegisterComponent {}
