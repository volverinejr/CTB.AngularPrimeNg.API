import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { InsubsistenciaModel } from 'src/app/shared/models/base/InsubsistenciaModel';
import { CrudService } from 'src/app/shared/class/crud-service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class InsubsistenciaService extends CrudService<InsubsistenciaModel>{

  constructor(
    protected http: HttpClient
  ) {
    super(http, `${environment.API_BASE}/insubsistencias`);
  }

}
