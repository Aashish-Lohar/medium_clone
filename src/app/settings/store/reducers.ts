import { Action, createReducer, on } from "@ngrx/store";
import { SettingsStateInterface } from "../types/settingsState.interface";
import { updateCurrentUserAction, updateCurrentUserFailureAction, updateCurrentUserSuccessAction } from "src/app/auth/store/actions/updateCurrentUser.action";

const initialState:SettingsStateInterface = {
    isSubmitting:false,
    validationError:null
}

const settingsReducers = createReducer(
    initialState,
    on(
        updateCurrentUserAction,
        (state):SettingsStateInterface =>({
            ...state,
            isSubmitting:true
        })
    ),
    on(
        updateCurrentUserSuccessAction,
        (state):SettingsStateInterface =>({
            ...state,
            isSubmitting:false
        })
    ),
    on(
        updateCurrentUserFailureAction,
        (state, action):SettingsStateInterface =>({
            ...state,
            isSubmitting:false,
            validationError:action.errors
        })
    ),
    
)

export function reducers(state:SettingsStateInterface, action:Action){
    return settingsReducers(state, action)
}