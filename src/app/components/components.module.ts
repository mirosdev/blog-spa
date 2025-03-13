import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@NgModule({
  imports: [CommonModule, ButtonModule],
  exports: [HeaderComponent, CommonModule],
  declarations: [HeaderComponent],
})
export class ComponentsModule {}
