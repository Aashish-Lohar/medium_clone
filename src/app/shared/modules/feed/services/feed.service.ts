import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetFeedResponseInterface } from '../types/getFeedResponse.interface';
import { ApiUrls } from 'src/app/shared/apiUrls';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(private http:HttpClient) { }

  getFeed(url:string):Observable<GetFeedResponseInterface>{
    const fullUrl = ApiUrls.baseUrl+url
    return this.http.get<GetFeedResponseInterface>(fullUrl);
  }
}
