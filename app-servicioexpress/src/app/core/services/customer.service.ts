import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from '../../models/ClientModel';
import { EndPoints } from '../../../environments/endpoints';
import { ResponseApiGeneric } from '../../models/ResponseApiGeneric';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getCustomers(idConsultant: string){
    return this.http.get<Client[]>(EndPoints.customer.getByConsultant + "?idConsultant=" + idConsultant);
  }

  create(idConsultant: string, nss: string, curp : string, phone: string, name: string, file1 : File, file2: File){
    const formData = new FormData();

    formData.append('file1', file1);
    formData.append('file2', file2);
    formData.append('idConsultant', idConsultant);
    formData.append('Customer.nss', nss);
    formData.append('Customer.curp', curp);
    formData.append('Customer.phone', phone);
    formData.append('Customer.id', "0");
    formData.append('Customer.name', name);

    return this.http.post<ResponseApiGeneric>(EndPoints.customer.create, formData);
  }
}