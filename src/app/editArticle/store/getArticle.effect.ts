import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { ArticleInterface } from 'src/app/shared/types/article.interface';
import { ArticleService } from 'src/app/shared/services/article.service';
import {
  getArticleAction,
  getArticleFailureAction,
  getArticleSuccessAction,
} from './getArticle.action';

@Injectable()
export class GetArticleEffect {
  getArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getArticleAction),
      switchMap(({ slug }) => {
        return this.sharedArticleService.getArticle(slug).pipe(
          map((article: ArticleInterface) => {
            return getArticleSuccessAction({ article });
          }),

          catchError(() => {
            return of(getArticleFailureAction());
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private sharedArticleService: ArticleService
  ) {}
}
