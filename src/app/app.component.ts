import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ComponentsModule } from './components/components.module';
import { globalModules } from './pages/_accessories/provide/global-modules';
import { Store } from '@ngrx/store';
import { isAuthenticated } from './root-store/actions';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ...globalModules, ComponentsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  #store = inject(Store);

  ngOnInit(): void {
    this.#store.dispatch(isAuthenticated());
  }
}
