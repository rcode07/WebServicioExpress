import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://localhost:7216/api/User/login';

  constructor(private http: HttpClient){}

  login(credentials: {userName: string, password: string}): Observable<{token : string}>{
    return this.http.post<{token: string}>(this.apiUrl, credentials);
  }

  storeToken(tokens: {token: string}){
    localStorage.setItem('access_token', tokens.token);
  }

  clearTokens(){
    localStorage.removeItem('access_token');
  }
}
