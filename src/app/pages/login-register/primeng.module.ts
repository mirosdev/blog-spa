import { NgModule } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  exports: [
    InputTextModule,
    FloatLabelModule,
    ButtonModule,
    ProgressSpinnerModule,
  ],
})
export class PrimengModule {}
