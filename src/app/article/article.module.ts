import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from './components/article/article.component';
import { EffectsModule } from '@ngrx/effects';
import { GetArticleEffect } from './store/getArticle.effect';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/getArticle.reducer';
import { RouterModule } from '@angular/router';

const routes = [
  {path:'articles/:slug', component:ArticleComponent}
]

@NgModule({
  declarations: [
    ArticleComponent
  ],
  imports: [
    CommonModule,
    EffectsModule.forFeature([GetArticleEffect]),
    StoreModule.forFeature('article',reducers),
    RouterModule.forChild(routes)
  ]
})
export class ArticleModule { }
