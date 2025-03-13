import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginRegisterComponent } from './containers/login-register/login-register.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { PrimengModule } from './primeng.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { AutogenUsersComponent } from './components/autogen-users/autogen-users.component';

const ROUTES: Routes = [{ path: '', component: LoginRegisterComponent }];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES),
    ReactiveFormsModule,
    PrimengModule,
    CommonModule,
    NgOptimizedImage,
  ],
  declarations: [
    LoginRegisterComponent,
    RegisterComponent,
    LoginComponent,
    AutogenUsersComponent,
  ],
})
export class LoginRegisterModule {}
