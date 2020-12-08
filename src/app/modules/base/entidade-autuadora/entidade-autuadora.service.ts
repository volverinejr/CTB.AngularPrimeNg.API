import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { EntidadeAutuadoraModel } from '../../../shared/models/base/Entidade-Autuadora.Model';
import { CrudService } from 'src/app/shared/class/crud-service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EntidadeAutuadoraService extends CrudService<EntidadeAutuadoraModel>{

  constructor(
    protected http: HttpClient
  ) {
    super(http, `${environment.API_BASE}/entidades_autuadoras`);
  }

}
