import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndPoints } from '../../../environments/endpoints';
import { ResponseApiGeneric } from '../../models/ResponseApiGeneric';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<ResponseApiGeneric>(EndPoints.supplier.getAll);
  }
}
