import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { SolicitacaoModel } from 'src/app/shared/models/ticket/SolicitacaoModel';
import { CrudService } from 'src/app/shared/class/crud-service';
import { environment } from 'src/environments/environment';
import { GenericPesquisa } from 'src/app/shared/class/GenericPesquisa';
import { debounceTime, distinctUntilChanged, take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SolicitacaoService extends CrudService<SolicitacaoModel>{

  constructor(
    protected http: HttpClient
  ) {
    super(http, `${environment.API_TICKET}/solicitacoes`);
  }


  public getAnalisePrioridade(prioridade: number) {

    return this.http.get<GenericPesquisa>(`${environment.API_TICKET}/solicitacoes/analise/prioridade/${prioridade}`)
      .pipe(
        take(1),
        debounceTime(2000),
        distinctUntilChanged(),
      );
  }


  public getSprintPrioridade(idSprint: number, prioridade: number) {

    return this.http.get<GenericPesquisa>(`${environment.API_TICKET}/solicitacoes/sprint/${idSprint}/prioridade/${prioridade}`)
      .pipe(
        take(1),
        debounceTime(2000),
        distinctUntilChanged(),
      );
  }



}
