import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ArticleStateInterface } from "../types/articleState.inteface";

export const articleFeatureSelector = createFeatureSelector<
  ArticleStateInterface
>('article');

export const isLoadingSelector = createSelector(
    articleFeatureSelector,
    (feedState:ArticleStateInterface)=>feedState.isLoading
)

export const errorSelector = createSelector(
    articleFeatureSelector,
    (feedState:ArticleStateInterface)=>feedState.error
)
export const articleSelector = createSelector(
    articleFeatureSelector,
    (feedState:ArticleStateInterface)=>feedState.data
)
