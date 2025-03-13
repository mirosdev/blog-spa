import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, ComponentsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
