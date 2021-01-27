import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { SprintModel } from 'src/app/shared/models/ticket/SprintModel';
import { CrudService } from 'src/app/shared/class/crud-service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SprintService extends CrudService<SprintModel>{

  constructor(
    protected http: HttpClient
  ) {
    super(http, `${environment.API_TICKET}/sprints`);
  }

}
