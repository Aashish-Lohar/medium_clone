import { Injectable } from '@angular/core';
import { RegisterRequestInterface } from '../types/registerRequest.interface';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { CurrentUserInputInterface } from 'src/app/shared/types/currentUserInput.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ApiUrls } from 'src/app/shared/apiUrls';
import { AuthResponseInterface } from '../types/authResponse.interface';
import { LoginRequestInterface } from '../types/loginRequest.interface';
import { AuthStateInterface } from '../types/authState.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  getUser(response:AuthResponseInterface):CurrentUserInterface{
    return response.user
  }

  register(data:RegisterRequestInterface):Observable<CurrentUserInterface>{
    const url = ApiUrls.baseUrl+ '/users';
    return this.http.post<AuthResponseInterface>(url,data).pipe(
      map(this.getUser)
    );
  }

  login(data:LoginRequestInterface):Observable<CurrentUserInterface>{
    const url = ApiUrls.baseUrl+ '/users/login';
    return this.http.post<AuthResponseInterface>(url,data).pipe(
      map(this.getUser)
    );
  }

  getCurrentUser():Observable<CurrentUserInterface>{
    const url = ApiUrls.baseUrl+ '/user';
    return this.http.get<AuthResponseInterface>(url).pipe(map(this.getUser));
  }

  updateCurrentUser(user:CurrentUserInputInterface):Observable<CurrentUserInterface>{
    const url = ApiUrls.baseUrl + '/user'
    return this.http.put<AuthResponseInterface>(url, {user}).pipe(map(this.getUser))
  }
}
