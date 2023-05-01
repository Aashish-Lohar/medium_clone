import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiUrls } from 'src/app/shared/apiUrls';
import { GetUserProfileResponseInterface } from 'src/app/userProfile/types/getUserProfileResponse.interface';
import { UserProfileInterface } from 'src/app/userProfile/types/userProfile.interface';

@Injectable({
  providedIn: 'root'
})
export class FollowUserService {

  constructor(private http:HttpClient) { }

  followUser(slug:string):Observable<UserProfileInterface>{
    const url = this.getUrl(slug)
    return this.http.post<GetUserProfileResponseInterface>(url, {}).pipe(map(this.getUserProfile))
  }
  unFollowUser(slug:string){
    const url = this.getUrl(slug)
    return this.http.delete<GetUserProfileResponseInterface>(url, {}).pipe(map(this.getUserProfile))
  }

  getUrl(slug:string):string{
    return `${ApiUrls.baseUrl}/profiles/${slug}/follow`
  }
  getUserProfile(response:GetUserProfileResponseInterface):UserProfileInterface{
    return response.profile
  }
}
