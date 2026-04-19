import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EndPoints } from '../../../environments/endpoints';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient){}

  login(credentials: {userName: string, password: string}): Observable<any>{
    return this.http.post<any>(EndPoints.user.login, credentials);
  }

  ping(): Observable<string>{
    return this.http.get<string>(EndPoints.user.ping);
  }

  storeToken(name: string, value: string){
      localStorage.setItem(name, value);
  }

  clearTokens(name: string){
    localStorage.removeItem(name);
  }
}