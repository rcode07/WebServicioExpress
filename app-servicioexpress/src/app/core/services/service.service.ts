import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndPoints } from '../../../environments/endpoints';
import { ResponseApiGeneric } from '../../models/ResponseApiGeneric';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  getHistroricalById(idService: string){
    return this.http.get<ResponseApiGeneric>(EndPoints.service.getById + "?idService=" + idService);
  }
}
