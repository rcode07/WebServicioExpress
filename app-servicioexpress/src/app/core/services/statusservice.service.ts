import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EndPoints } from '../../../environments/endpoints';
import { ResponseApiGeneric } from '../../models/ResponseApiGeneric';

@Injectable({
  providedIn: 'root'
})
export class StatusserviceService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<ResponseApiGeneric>(EndPoints.status.getAll);
  }
}