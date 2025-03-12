import { NgModule } from '@angular/core';
import { MainBlogsComponent } from './containers/main-blogs/main-blogs.component';
import { RouterModule, Routes } from '@angular/router';

const ROUTES: Routes = [{ path: '', component: MainBlogsComponent }];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  declarations: [MainBlogsComponent],
})
export class MainBlogsModule {}
