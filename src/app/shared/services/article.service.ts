import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ArticleInterface } from '../types/article.interface';
import { ApiUrls } from '../apiUrls';
import { GetArticleResponseInterface } from '../types/getArticleResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http:HttpClient) { }

  getArticle(slug:string):Observable<ArticleInterface>{
    const fullUrl = `${ApiUrls.baseUrl}/articles/${slug}`
    return this.http.get<GetArticleResponseInterface>(fullUrl).pipe(
      map((response)=>{
        return response.article
      })
    )
  }
}
