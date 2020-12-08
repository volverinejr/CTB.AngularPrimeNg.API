import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { NaturezaModel } from '../../../shared/models/infracao/NaturezaModel';
import { CrudService } from 'src/app/shared/class/crud-service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class NaturezaService extends CrudService<NaturezaModel>{

  constructor(
    protected http: HttpClient
  ) {
    super(http, `${environment.API_INFRACAO}/naturezas`);
  }

}
