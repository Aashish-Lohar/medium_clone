import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiUrls } from 'src/app/shared/apiUrls';
import { ArticleInterface } from 'src/app/shared/types/article.interface';
import { GetArticleResponseInterface } from 'src/app/shared/types/getArticleResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class AddToFavoritesService {

  constructor(private http:HttpClient) { }

  addToFavorites(slug:string):Observable<ArticleInterface>{
    const url = this.getUrl(slug)
    return this.http.post<GetArticleResponseInterface>(url, {}).pipe(map(this.getArticle))
  }
  removeFromFavorites(slug:string):Observable<ArticleInterface>{
    const url = this.getUrl(slug)
    return this.http.delete<GetArticleResponseInterface>(url, {}).pipe(map(this.getArticle))
  }
  getUrl(slug:string):string{
    return `${ApiUrls.baseUrl}/articles/${slug}/favorite`
  }
  getArticle(response:GetArticleResponseInterface):ArticleInterface{
    return response.article
  }
}
