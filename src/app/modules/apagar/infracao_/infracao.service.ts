import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { InfracaoModel } from './../../shared/models/InfracaoModel';
import { CrudService } from 'src/app/shared/class/crud-service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class InfracaoService extends CrudService<InfracaoModel>{

  constructor(
    protected http: HttpClient
  ) {
    super(http, `${environment.API_INFRACAO}v1/infracao`);
  }

}
