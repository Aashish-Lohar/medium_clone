import { createAction, props } from "@ngrx/store";
import { ActionTypes } from "./actionTypes";
import { GetUserProfileResponseInterface } from "src/app/userProfile/types/getUserProfileResponse.interface";
import { UserProfileInterface } from "src/app/userProfile/types/userProfile.interface";

export const followUserAction = createAction(
    ActionTypes.FOLLOW_USER,
    props<{followed:boolean; slug:string}>()
    )

export const followUserSuccessAction = createAction(
    ActionTypes.FOLLOW_USER_SUCCESS,
    props<{userProfile:UserProfileInterface}>()
)

export const followUserFailureAction = createAction(
    ActionTypes.FOLLOW_USER_FAILURE
)