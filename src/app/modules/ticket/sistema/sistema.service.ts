import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { SistemaModel } from 'src/app/shared/models/ticket/SistemaModel';
import { CrudService } from 'src/app/shared/class/crud-service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SistemaService extends CrudService<SistemaModel>{

  constructor(
    protected http: HttpClient
  ) {
    super(http, `${environment.API_TICKET}/sistemas`);
  }

}
