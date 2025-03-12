import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { checkToken } from './root-store/actions';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  #store = inject(Store);

  ngOnInit(): void {
    // this.#store.dispatch(checkToken());
  }
}
