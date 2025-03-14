import { NgModule } from '@angular/core';
import { MainBlogsComponent } from './containers/main-blogs/main-blogs.component';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './components/blog/blog.component';
import { BlogsListComponent } from './components/blogs-list/blogs-list.component';
import { CommonModule } from '@angular/common';
import { BlogCommentsComponent } from './components/blog-comments/blog-comments.component';
import { PrimengModule } from './primeng.module';
import { ReactiveFormsModule } from '@angular/forms';

const ROUTES: Routes = [{ path: '', component: MainBlogsComponent }];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES),
    CommonModule,
    PrimengModule,
    ReactiveFormsModule,
  ],
  declarations: [
    MainBlogsComponent,
    BlogComponent,
    BlogsListComponent,
    BlogCommentsComponent,
  ],
})
export class MainBlogsModule {}
