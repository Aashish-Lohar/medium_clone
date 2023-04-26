import { FeedStateInterface } from "src/app/shared/modules/feed/types/feedState.interface";
import { AuthStateInterface } from "./authState.interface";
import { PopularTagsStateInterface } from "src/app/shared/modules/popularTags/types/popularTagsState.interface";

export interface AppStateInterface{
    auth:AuthStateInterface
    feed:FeedStateInterface
    popularTags:PopularTagsStateInterface
}