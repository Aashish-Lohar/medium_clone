import { PopularTagsService } from "../services/popular-tags.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { getPopularTagsAction, getPopularTagsFailureAction, getPopularTagsSuccessAction } from "./getPopularTags.action";
import { catchError, map, of, switchMap } from "rxjs";
import { PopularTagType } from "src/app/shared/types/popularTag.type";
import { Injectable } from "@angular/core";

@Injectable()
export class GetPopularTagsEffect{
    getPopularTags$ = createEffect(()=>
        this.actions$.pipe(
            ofType(getPopularTagsAction),
            switchMap(()=>{
                return this.popularTagsService.getPopularTags().pipe(
                    map((popularTags:PopularTagType[])=>{
                        return getPopularTagsSuccessAction({popularTags})
                    }),
                    catchError(()=>{
                        return of(getPopularTagsFailureAction())
                    })
                )
            })
        )
    )
    constructor(
        private actions$: Actions,
        private popularTagsService: PopularTagsService
      ) {}
}