import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EndPoints } from '../../../environments/endpoints';
import { ResponseApiGeneric } from '../../models/ResponseApiGeneric';
import { ConsultantModel } from '../../models/ConsultantModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient){}

  login(credentials: {userName: string, password: string}): Observable<any>{
    return this.http.post<any>(EndPoints.user.login, credentials);
  }

  createConsultant(consultant: ConsultantModel): Observable<any>{
    return this.http.post<ResponseApiGeneric>(EndPoints.user.consultant, consultant);
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

  getConsultants(): Observable<any>{
    return this.http.get<ResponseApiGeneric>(EndPoints.user.consultant);
  }
}