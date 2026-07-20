import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from '../../models/ClientModel';
import { EndPoints } from '../../../environments/endpoints';
import { ResponseApiGeneric } from '../../models/ResponseApiGeneric';
import { ClientUpdateRequest } from '../../models/ClientUpdateRequest';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getCustomers(idConsultant: string){
    return this.http.get<Client[]>(EndPoints.customer.getByConsultant + "?idConsultant=" + idConsultant);
  }

  getResume(idConsultant: string){
    return this.http.get<ResponseApiGeneric>(EndPoints.customer.getResume + "?idConsultant=" + idConsultant);
  }

  create(idConsultant: string, nss: string, curp : string, phone: string, name: string, file1 : File, file2?: File | null){
    const formData = new FormData();

    formData.append('file1', file1);
    if (file2) {
      formData.append('file2', file2);
    }
    formData.append('idConsultant', idConsultant);
    formData.append('Customer.nss', nss);
    formData.append('Customer.curp', curp);
    formData.append('Customer.phone', phone);
    formData.append('Customer.id', "0");
    formData.append('Customer.name', name);

    return this.http.post<ResponseApiGeneric>(EndPoints.customer.create, formData);
  }

  saveIdse(idService : string, fileIdse : File, dateAltaIMSS: Date){
    const formData = new FormData();
    formData.append('IdService', idService);
    formData.append('filseIdse', fileIdse);
    formData.append('dateAltaIMSS', dateAltaIMSS.toISOString());

    return this.http.post<ResponseApiGeneric>(EndPoints.customer.idse, formData);
  }

  saveTicketPagoAlta(idService : string, fileTicketPagoAlta : File ){
    const formData = new FormData();
    formData.append('IdService', idService);
    formData.append('fileTicketPagoAlta', fileTicketPagoAlta);

    return this.http.post<ResponseApiGeneric>(EndPoints.customer.ticketPagoAlta, formData);
  }

  getAll(){
    return this.http.get<ResponseApiGeneric>(EndPoints.customer.getAll);
  }

  getCustomerById(id: string){
    return this.http.get<ResponseApiGeneric>(EndPoints.customer.getById + "?id=" + id);
  }

  update(client : ClientUpdateRequest){
    return this.http.patch<ResponseApiGeneric>(EndPoints.customer.create, client);
  }

  getFile(){
    return this.http.post(EndPoints.customer.getFile, {} ,{ responseType: 'blob', observe: 'response' });
  }

  
}