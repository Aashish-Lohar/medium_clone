import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditArticleComponent } from './components/edit-article/edit-article.component';
import { ArticleFormModule } from '../shared/modules/articleForm/article-form.module';
import { LoadingModule } from '../shared/modules/loading/loading.module';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { UpdateArticleEffect } from './store/upateArticle.effect';
import { GetArticleEffect } from './store/getArticle.effect';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/editArticle.reducer';

const routes = [
  {path:'articles/:slug/edit', component:EditArticleComponent}
]

@NgModule({
  declarations: [
    EditArticleComponent
  ],
  imports: [
    CommonModule,
    ArticleFormModule,
    LoadingModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature([UpdateArticleEffect,GetArticleEffect]),
    StoreModule.forFeature('editArticle', reducers)
  ]
})
export class EditArticleModule { }
