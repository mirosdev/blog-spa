import { NgModule } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';

@NgModule({
  exports: [InputTextModule, FloatLabelModule, ButtonModule],
})
export class PrimengModule {}
