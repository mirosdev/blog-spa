import { NgModule } from '@angular/core';
import { MainBlogsComponent } from './containers/main-blogs/main-blogs.component';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { NGRX_FEATURE } from '../_accessories/enums/ngrx-feature.enum';
import { EffectsModule } from '@ngrx/effects';
import { mainBlogsFeatureReducers } from './store/reducer';
import { MainBlogsEffects } from './store/effects';

const ROUTES: Routes = [{ path: '', component: MainBlogsComponent }];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES),
    StoreModule.forFeature(
      NGRX_FEATURE.MAIN_BLOGS_FEATURE,
      mainBlogsFeatureReducers,
    ),
    EffectsModule.forFeature([MainBlogsEffects]),
  ],
  declarations: [MainBlogsComponent],
})
export class MainBlogsModule {}
