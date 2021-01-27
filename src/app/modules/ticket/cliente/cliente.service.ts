import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { ClienteModel } from 'src/app/shared/models/ticket/ClienteModel';
import { CrudService } from 'src/app/shared/class/crud-service';
import { environment } from 'src/environments/environment';
import { ClienteSistemaModel } from 'src/app/shared/models/ticket/ClienteSistemaModel';
import { take } from 'rxjs/operators';
import { CodigoEntidadeModel } from 'src/app/shared/models/ticket/CodigoEntidadeModel';


@Injectable({
  providedIn: 'root'
})
export class ClienteService extends CrudService<ClienteModel>{

  constructor(
    protected http: HttpClient
  ) {
    super(http, `${environment.API_TICKET}/clientes`);
  }

  public adicionarSistemaAoCliente(idCliente: number, model: CodigoEntidadeModel) {
    return this.http.post(`${environment.API_TICKET}/clientes/${idCliente}/sistemas`, model).pipe(take(1));
  }

  public getSistemasDoCliente(id: number) {
    return this.http.get<ClienteSistemaModel[]>(`${environment.API_TICKET}/clientes/${id}/sistemas`).pipe(take(1));
  }

  public deleteSistemaDoCliente(idCliente: number, idSistema: number) {
    return this.http.delete(`${environment.API_TICKET}/clientes/${idCliente}/sistemas/${idSistema}`).pipe(take(1));
  }

}
