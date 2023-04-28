import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiUrls } from 'src/app/shared/apiUrls';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http:HttpClient) { }

  deleteArticle(slug:string):Observable<{}>{
    const url = `${ApiUrls.baseUrl}/articles/${slug}`
    return this.http.delete<{}>(url)
  }
}
