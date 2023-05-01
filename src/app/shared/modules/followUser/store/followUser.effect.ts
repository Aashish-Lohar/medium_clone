import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  followUserAction,
  followUserFailureAction,
  followUserSuccessAction,
} from './followUser.action';
import { FollowUserService } from '../services/follow-user.service';
import { UserProfileInterface } from 'src/app/userProfile/types/userProfile.interface';

@Injectable()
export class FollowUserEffect {
  followUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(followUserAction),
      switchMap(({ followed, slug }) => {
        const userProfile$ = followed
          ? this.followUserService.unFollowUser(slug)
          : this.followUserService.followUser(slug);
        return userProfile$.pipe(
          map((userProfile: UserProfileInterface) => {
            return followUserSuccessAction({ userProfile });
          }),
          catchError(() => {
            return of(followUserFailureAction());
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private followUserService: FollowUserService
  ) {}
}
