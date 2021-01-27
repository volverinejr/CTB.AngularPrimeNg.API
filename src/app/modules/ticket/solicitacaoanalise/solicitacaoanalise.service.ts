import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { SolicitacaoAnaliseModel } from 'src/app/shared/models/ticket/SolicitacaoAnaliseModel';
import { CrudService } from 'src/app/shared/class/crud-service';
import { environment } from 'src/environments/environment';
import { take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SolicitacaoAnaliseService extends CrudService<SolicitacaoAnaliseModel>{

  constructor(
    protected http: HttpClient
  ) {
    super(http, `${environment.API_TICKET}/analise`);
  }

  public analise(model: SolicitacaoAnaliseModel) {
    let id: number = model.id;

    return this.http.put(`${environment.API_TICKET}/analise/${id}`, model).pipe(take(1));
  }


}
