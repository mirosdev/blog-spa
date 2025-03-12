import { NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PagesModule } from './pages/pages.lazy-load.module';
import { StoreModule } from '@ngrx/store';
import { appFeatureReducers } from './root-store/reducer';
import { AppEffects } from './root-store/effects';
import { EffectsModule } from '@ngrx/effects';
import { NGRX_FEATURE } from './pages/_accessories/enums/ngrx-feature.enum';

@NgModule({
  imports: [
    RouterOutlet,
    PagesModule,
    StoreModule.forFeature(NGRX_FEATURE.APP_FEATURE, appFeatureReducers),
    EffectsModule.forFeature([AppEffects]),
  ],
  exports: [RouterOutlet, CommonModule],
  declarations: [],
})
export class AppModule {}
