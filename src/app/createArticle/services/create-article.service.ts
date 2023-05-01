import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiUrls } from 'src/app/shared/apiUrls';
import { ArticleInterface } from 'src/app/shared/types/article.interface';
import { ArticleInputInterface } from 'src/app/shared/types/articleInput.interface';
import { SaveArticleResponseInterface } from 'src/app/shared/types/saveArticleResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class CreateArticleService {

  constructor(private http:HttpClient) { }

  createArticle(article:ArticleInputInterface):Observable<ArticleInterface>{
    const fullUrl = ApiUrls.baseUrl + '/articles/'
    // console.log('articlInput',article);
    
    return this.http.post<SaveArticleResponseInterface>(fullUrl, {article}).pipe(
      map((response:SaveArticleResponseInterface)=>{
        return response.article
      })
    )
  }
}
