import {ProfileInterface} from './profile.interface'
export interface ArticleInterface{
    body: string
    description: string
    favorited: boolean
    favoritesCount: number
    slug: string
    tagList: string[]
    title: string
    createdAt: string
    updatedAt: string
    author:ProfileInterface
}