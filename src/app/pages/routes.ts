import { Routes } from '@angular/router';
import { APP_ROUTES, preformatRouteEnum } from './_accessories/main-routes';
import { NewcomerGuard } from './_accessories/guards/newcomer.guard';
import { AuthGuard } from './_accessories/guards/auth.guard';

export const routes: Routes = [
  {
    path: preformatRouteEnum(APP_ROUTES.LOGIN_REGISTER),
    canActivate: [NewcomerGuard],
    loadChildren: async () =>
      (await import('./login-register/login-register.module'))
        .LoginRegisterModule,
  },
  {
    path: preformatRouteEnum(APP_ROUTES.MAIN_BLOGS),
    canActivate: [AuthGuard],
    loadChildren: async () =>
      (await import('./main-blogs/main-blogs.module')).MainBlogsModule,
  },
];
