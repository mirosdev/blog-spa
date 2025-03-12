import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideState, provideStore } from '@ngrx/store';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { provideEffects } from '@ngrx/effects';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { appFeature } from './root-store/reducer';
import { AppEffects } from './root-store/effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
      },
    }),
    provideHttpClient(withInterceptorsFromDi()),
    provideStore(),
    provideState(appFeature),
    provideEffects([AppEffects]),
  ],
};
