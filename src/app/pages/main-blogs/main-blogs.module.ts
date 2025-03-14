import { NgModule } from '@angular/core';
import { MainBlogsComponent } from './containers/main-blogs/main-blogs.component';
import { RouterModule, Routes } from '@angular/router';
import { BlogArticleComponent } from './components/blog-article/blog-article.component';
import { BlogArticlesListComponent } from './components/blog-articles-list/blog-articles-list.component';
import { CommonModule } from '@angular/common';
import { BlogArticleCommentsComponent } from './components/blog-article-comments/blog-article-comments.component';
import { PrimengModule } from './primeng.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NewArticleFormComponent } from './components/new-article-form/new-article-form.component';

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
    BlogArticleComponent,
    BlogArticlesListComponent,
    BlogArticleCommentsComponent,
    NewArticleFormComponent,
  ],
})
export class MainBlogsModule {}
