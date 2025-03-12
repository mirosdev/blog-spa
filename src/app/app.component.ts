import { Component, inject, OnInit } from '@angular/core';
import { AppModule } from './app.module';
import { Store } from '@ngrx/store';
import { checkToken } from './root-store/actions';

@Component({
  selector: 'app-root',
  imports: [AppModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  #store = inject(Store);

  ngOnInit(): void {
    this.#store.dispatch(checkToken());
  }
}
