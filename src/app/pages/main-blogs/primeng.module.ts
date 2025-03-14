import { NgModule } from '@angular/core';
import { FloatLabelModule } from 'primeng/floatlabel';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';

@NgModule({
  exports: [FloatLabelModule, TextareaModule, ButtonModule],
})
export class PrimengModule {}
