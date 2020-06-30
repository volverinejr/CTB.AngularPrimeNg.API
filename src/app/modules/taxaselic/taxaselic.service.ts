import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { TaxaSelicModel } from './../../shared/models/TaxaSelicModel';
import { CrudService } from 'src/app/shared/class/crud-service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TaxaSelicService extends CrudService<TaxaSelicModel>{

  constructor(
    protected http: HttpClient
  ) {
    super(http, `${environment.API}v1/taxaselic`);
  }

}
