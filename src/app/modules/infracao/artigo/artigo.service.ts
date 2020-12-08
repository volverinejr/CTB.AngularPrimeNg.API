import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { ArtigoModel } from '../../../shared/models/infracao/ArtigoModel';
import { CrudService } from 'src/app/shared/class/crud-service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ArtigoService extends CrudService<ArtigoModel>{

  constructor(
    protected http: HttpClient
  ) {
    super(http, `${environment.API_INFRACAO}/artigos`);
  }

}
