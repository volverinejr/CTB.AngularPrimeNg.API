import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { TipoTarefaModel } from 'src/app/shared/models/ticket/TipoTarefaModel';
import { CrudService } from 'src/app/shared/class/crud-service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TipoTarefaService extends CrudService<TipoTarefaModel>{

  constructor(
    protected http: HttpClient
  ) {
    super(http, `${environment.API_TICKET}/tipotarefa`);
  }

}
