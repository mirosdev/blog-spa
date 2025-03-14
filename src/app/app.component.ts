import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ComponentsModule } from './components/components.module';
import { globalModules } from './pages/_accessories/provide/global-modules';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ...globalModules, ComponentsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
