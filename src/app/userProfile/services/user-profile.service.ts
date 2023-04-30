import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { UserProfileInterface } from '../types/userProfile.interface';
import { ApiUrls } from 'src/app/shared/apiUrls';
import { GetUserProfileResponseInterface } from '../types/getUserProfileResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private http:HttpClient) { }

  getUserProfile(slug:string):Observable<UserProfileInterface>{
    const url = `${ApiUrls.baseUrl}/profiles/${slug}`
    return this.http.get<GetUserProfileResponseInterface>(url).pipe(map((response:GetUserProfileResponseInterface)=>response.profile))
  }
}
