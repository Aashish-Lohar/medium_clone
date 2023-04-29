import { ArticleInterface } from "./article.interface";
import { BackendErrorsInterface } from "./backendErrors.interface";

export interface EditArticleStateInterface{
    article:ArticleInterface|null
    isLoading:boolean
    isSubmitting:boolean
    validationErrors:BackendErrorsInterface|null
}