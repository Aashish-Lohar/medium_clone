import { Actions, createEffect, ofType } from '@ngrx/effects';
import { getFeedAction, getFeedFailureAction, getFeedSuccessAction } from './getFeed.action'
import { catchError, map, of, switchMap, tap } from 'rxjs';
import {FeedService} from '../services/feed.service'
import { Injectable } from '@angular/core';
import { GetFeedResponseInterface } from '../types/getFeedResponse.interface';



@Injectable()
export class GetFeedEffect {
  getFeed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getFeedAction),
      switchMap(({url}) => {
        return this.feedService.getFeed(url).pipe(
          map((feed:GetFeedResponseInterface) => {
            return getFeedSuccessAction({feed})
          }),
          catchError(() => {
            return of(
              getFeedFailureAction()
            );
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private feedService: FeedService
  ) {}
}
