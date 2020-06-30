import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { GrupoModel } from './../../shared/models/GrupoModel';
import { CrudService } from 'src/app/shared/class/crud-service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class GrupoService extends CrudService<GrupoModel>{

  constructor(
    protected http: HttpClient
  ) {
    super(http, `${environment.API}v1/grupo`);
  }

}
