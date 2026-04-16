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

  setActiveCustomer(idService: string){
    const formData = new FormData();
    formData.append('idService', idService);
    return this.http.post<ResponseApiGeneric>(EndPoints.service.activate + "?idService=" + idService, formData);
  }

  setToInactiveCustomer(idService: string){
    const formData = new FormData();
    formData.append('idService', idService);
    return this.http.post<ResponseApiGeneric>(EndPoints.service.inactivate + "?idService=" + idService, formData);
  }

  setConfirmCancelation(idService: string){
    const formData = new FormData();
    formData.append('idService', idService);
    return this.http.post<ResponseApiGeneric>(EndPoints.service.confirmCancelation + "?idService=" + idService, formData);
  }
}
