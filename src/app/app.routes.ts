import { Routes } from '@angular/router';
import {
  APP_ROUTES,
  preformatRouteEnum,
} from './pages/_accessories/main-routes';
import { provideState } from '@ngrx/store';
import { mainBlogsFeature } from './pages/main-blogs/store/reducer';
import { provideEffects } from '@ngrx/effects';
import { MainBlogsEffects } from './pages/main-blogs/store/effects';
import { AuthGuard } from './pages/_accessories/guards/auth.guard';
import { BlogsLoadedGuard } from './pages/_accessories/guards/blogs-loaded.guard';
import { NewcomerGuard } from './pages/_accessories/guards/newcomer.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: preformatRouteEnum(APP_ROUTES.LOGIN_REGISTER),
  },
  {
    path: preformatRouteEnum(APP_ROUTES.LOGIN_REGISTER),
    canActivate: [NewcomerGuard],
    loadChildren: async () =>
      (await import('./pages/login-register/login-register.module'))
        .LoginRegisterModule,
    providers: [],
  },
  {
    path: preformatRouteEnum(APP_ROUTES.MAIN_BLOGS),
    canActivate: [AuthGuard, BlogsLoadedGuard],
    loadChildren: async () =>
      (await import('./pages/main-blogs/main-blogs.module')).MainBlogsModule,
    providers: [
      provideState(mainBlogsFeature),
      provideEffects([MainBlogsEffects]),
    ],
  },
];
