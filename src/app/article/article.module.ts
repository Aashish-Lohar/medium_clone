import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from './components/article/article.component';
import { EffectsModule } from '@ngrx/effects';
import { GetArticleEffect } from './store/getArticle.effect';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/getArticle.reducer';
import { RouterModule } from '@angular/router';
import { LoadingModule } from '../shared/modules/loading/loading.module';
import { ErrorMessageModule } from '../shared/modules/errorMessage/error-message.module';
import { TagListModule } from '../shared/modules/tagList/tag-list.module';
import { DeleteArticleEffect } from './store/deleteArticle.effect';

const routes = [
  {path:'articles/:slug', component:ArticleComponent}
]

@NgModule({
  declarations: [
    ArticleComponent
  ],
  imports: [
    CommonModule,
    EffectsModule.forFeature([GetArticleEffect,DeleteArticleEffect]),
    StoreModule.forFeature('article',reducers),
    RouterModule.forChild(routes),
    LoadingModule,
    ErrorMessageModule,
    TagListModule
  ]
})
export class ArticleModule { }
