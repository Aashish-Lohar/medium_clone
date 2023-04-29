import { FeedStateInterface } from "src/app/shared/modules/feed/types/feedState.interface";
import { AuthStateInterface } from "./authState.interface";
import { PopularTagsStateInterface } from "src/app/shared/modules/popularTags/types/popularTagsState.interface";
import { ArticleStateInterface } from "src/app/article/types/articleState.inteface";
import { CreateArticleStateInterface } from "src/app/createArticle/types/createArticleState.interface";
import { EditArticleStateInterface } from "src/app/shared/types/editArticleState.interface";

export interface AppStateInterface{
    auth:AuthStateInterface
    feed:FeedStateInterface
    popularTags:PopularTagsStateInterface
    article:ArticleStateInterface
    createArticle:CreateArticleStateInterface
    editArticle:EditArticleStateInterface
}