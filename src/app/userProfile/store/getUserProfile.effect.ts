import { Injectable } from '@angular/core';
import {UserProfileService} from '../services/user-profile.service'
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { getUserProfileAction, getUserProfileFailureAction, getUserProfileSuccessAction } from './getUserProfile.action';
import { catchError, map, of, switchMap } from 'rxjs';
import { UserProfileInterface } from '../types/userProfile.interface';
@Injectable()
export class GetUserProfileEffect{
    getUserProfile$ = createEffect(()=>
        this.actions$.pipe(
            ofType(getUserProfileAction),
            switchMap(({slug})=>{
                return this.userProfileService.getUserProfile(slug).pipe(
                    map((userProfile:UserProfileInterface)=>{
                        return getUserProfileSuccessAction({userProfile})
                    }),
                    catchError(()=>{
                        return of(getUserProfileFailureAction())
                    })
                    
                )
            })
        )
    )
    constructor(private actions$:Actions, private userProfileService:UserProfileService){}
}
