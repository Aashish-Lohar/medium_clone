import { Injectable } from '@angular/core';
import { RegisterRequestInterface } from '../types/registerRequest.interface';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ApiUrls } from 'src/app/shared/apiUrls';
import { AuthResponseInterface } from '../types/authResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  register(data:RegisterRequestInterface):Observable<CurrentUserInterface>{
    const url = ApiUrls.baseUrl+ '/users';
    return this.http.post<AuthResponseInterface>(url,data).pipe(
      map((response:AuthResponseInterface)=>response.user)
    );
  }
}
