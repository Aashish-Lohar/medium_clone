import { Action, createReducer, on } from "@ngrx/store";
import { ArticleStateInterface } from "../types/articleState.inteface";
import { getArticleAction, getArticleFailureAction, getArticleSuccessAction } from "./getArticle.action";
import { routerNavigationAction } from "@ngrx/router-store";

const initialState:ArticleStateInterface={
    data:null,
    isLoading:false,
    error:null
}

const articleReducer = createReducer(
    initialState,
    on(
        getArticleAction,
        (state):ArticleStateInterface=>({
            ...state,
            isLoading:true
        })
    ),
    on(
        getArticleSuccessAction,
        (state,action):ArticleStateInterface=>({
            ...state,
            isLoading:false,
            data:action.article
        })
    ),
    on(
        getArticleFailureAction,
        (state):ArticleStateInterface=>({
            ...state,
            isLoading:false
        })
    ),
    on(routerNavigationAction,():ArticleStateInterface=>initialState)
)

export function reducers(state:ArticleStateInterface, action:Action){
    return articleReducer(state,action)
}