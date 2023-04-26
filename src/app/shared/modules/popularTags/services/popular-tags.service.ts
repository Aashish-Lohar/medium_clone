import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiUrls } from 'src/app/shared/apiUrls';
import { PopularTagType } from 'src/app/shared/types/popularTag.type';

@Injectable({
  providedIn: 'root'
})
export class PopularTagsService {

  constructor(private http:HttpClient) { }

  getPopularTags():Observable<PopularTagType[]>{
    const url = ApiUrls.baseUrl + '/tags'
    return this.http.get(url).pipe(
      map((response:any)=>{
        return response.tags
      })
    )
  }
}
