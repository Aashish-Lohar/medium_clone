import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, map, of, switchMap, tap } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { updateCurrentUserAction, updateCurrentUserFailureAction, updateCurrentUserSuccessAction } from '../actions/updateCurrentUser.action';

@Injectable()
export class UpdateCurrentUserEffect {
  updateCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateCurrentUserAction),
      switchMap(({ currentUserInput }) => {
        return this.authService.updateCurrentUser(currentUserInput).pipe(
          map((currentUser: CurrentUserInterface) => {
            return updateCurrentUserSuccessAction({currentUser});
          }),

          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              updateCurrentUserFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );

//   redirectAfterSubmit$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(loginSuccessAction),
//       tap(() => {
//         this.router.navigateByUrl('/')
//       })
//     ),
//     {dispatch:false}
//   );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router:Router
  ) {}
}
