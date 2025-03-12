import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginRegisterComponent } from './containers/login-register/login-register.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';

const ROUTES: Routes = [{ path: '', component: LoginRegisterComponent }];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  declarations: [LoginRegisterComponent, RegisterComponent, LoginComponent],
})
export class LoginRegisterModule {}
