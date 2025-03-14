import { NgModule } from '@angular/core';
import { MainBlogsComponent } from './containers/main-blogs/main-blogs.component';
import { RouterModule, Routes } from '@angular/router';
import { BlogArticleComponent } from './components/blog-article/blog-article.component';
import { BlogArticlesListComponent } from './components/blog-articles-list/blog-articles-list.component';
import { NgOptimizedImage } from '@angular/common';
import { BlogArticleCommentsComponent } from './components/blog-article-comments/blog-article-comments.component';
import { PrimengModule } from './primeng.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NewArticleFormComponent } from './components/new-article-form/new-article-form.component';
import { globalModules } from '../_accessories/provide/global-modules';

const ROUTES: Routes = [{ path: '', component: MainBlogsComponent }];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES),
    ...globalModules,
    PrimengModule,
    ReactiveFormsModule,
    NgOptimizedImage,
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
