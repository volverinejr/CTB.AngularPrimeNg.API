import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { PessoaModel } from 'src/app/shared/models/ticket/PessoaModel';
import { CrudService } from 'src/app/shared/class/crud-service';
import { environment } from 'src/environments/environment';
import { PessoaTimeModel } from 'src/app/shared/models/ticket/PessoaTimeModel';
import { take } from 'rxjs/operators';
import { CodigoEntidadeModel } from 'src/app/shared/models/ticket/CodigoEntidadeModel';


@Injectable({
  providedIn: 'root'
})
export class PessoaService extends CrudService<PessoaModel>{

  constructor(
    protected http: HttpClient
  ) {
    super(http, `${environment.API_TICKET}/pessoas`);
  }

  public adicionarTimeAPessoa(idCliente: number, model: CodigoEntidadeModel) {
    return this.http.post(`${environment.API_TICKET}/pessoas/${idCliente}/times`, model).pipe(take(1));
  }

  public getTimesDaPessoa(id: number) {
    return this.http.get<PessoaTimeModel[]>(`${environment.API_TICKET}/pessoas/${id}/times`).pipe(take(1));
  }

  public deleteTimeDaPessoa(idPessoa: number, idTime: number) {
    return this.http.delete(`${environment.API_TICKET}/pessoas/${idPessoa}/times/${idTime}`).pipe(take(1));
  }

}
