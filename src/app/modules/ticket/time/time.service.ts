import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { TimeModel } from 'src/app/shared/models/ticket/TimeModel';
import { CrudService } from 'src/app/shared/class/crud-service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TimeService extends CrudService<TimeModel>{

  constructor(
    protected http: HttpClient
  ) {
    super(http, `${environment.API_TICKET}/times`);
  }

}
