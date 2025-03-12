import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routes } from './routes';

const ROUTES: Routes = [...routes];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
})
export class PagesModule {}
