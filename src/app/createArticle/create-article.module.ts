import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateArticleComponent } from './components/create-article/create-article.component';
import { RouterModule } from '@angular/router';
import { ArticleFormModule } from '../shared/modules/articleForm/article-form.module';
import { EffectsModule } from '@ngrx/effects';
import { CreateArticleEffect } from './store/createArticle.effect';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/createArticle.reducer';

const routes = [
  {path:'articles/new', component:CreateArticleComponent}
]

@NgModule({
  declarations: [
    CreateArticleComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ArticleFormModule,
    EffectsModule.forFeature([CreateArticleEffect]),
    StoreModule.forFeature('createArticle', reducers)
  ]
})
export class CreateArticleModule { }
