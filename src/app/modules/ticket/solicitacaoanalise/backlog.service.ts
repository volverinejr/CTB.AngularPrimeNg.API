import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';


import { BacklogModel } from 'src/app/shared/models/ticket/BacklogModel';
import { CrudService } from 'src/app/shared/class/crud-service';
import { environment } from 'src/environments/environment';
import { debounceTime, distinctUntilChanged, take } from 'rxjs/operators';
import { GenericPesquisa } from 'src/app/shared/class/GenericPesquisa';


@Injectable({
  providedIn: 'root'
})
export class BacklogService extends CrudService<BacklogModel>{

  constructor(
    protected http: HttpClient
  ) {
    super(http, `${environment.API_TICKET}/backlogs`);
  }


  public getBacklogsDaSolicitacao(idSolicitacao, pagina, qtd, campo, ordem, filtro) {
    let aplicandoFiltro = '';

    if (filtro != '') {
      if (campo == 'id') {
        if (isNaN(filtro)) {
          filtro = '1';
        }

        aplicandoFiltro = '/findByIdGreaterThanEqual/' + filtro
      }
      else if (campo == 'nome') {
        aplicandoFiltro = '/findByNome/' + filtro
      }
      else if (campo == 'descricao') {
        aplicandoFiltro = '/findByDescricao/' + filtro
      }
    }

    if (ordem == -1) {
      campo = '-' + campo;
    }

    let httpParams = new HttpParams();
    httpParams = httpParams.set('page', pagina);
    httpParams = httpParams.set('size', qtd);
    httpParams = httpParams.set('sort', campo);


    return this.http.get<GenericPesquisa>(`${environment.API_TICKET}/backlogs/solicitacao/${idSolicitacao}${aplicandoFiltro}`, {
      params: httpParams
    })
      .pipe(
        take(1),
        debounceTime(2000),
        distinctUntilChanged(),
      );
  }


  public saveBacklog(model: BacklogModel, token) {
    if (model['id']) {
      return this.updateBacklog(model, token);
    } else {
      return this.createBacklog(model, token);
    }
  }


  private createBacklog(model: BacklogModel, token) {
    return this.http.post(`${environment.API_TICKET}/backlogs/`, model).pipe(take(1));
  }

  private updateBacklog(model: BacklogModel, token) {
    return this.http.put(`${environment.API_TICKET}/backlogs/${model['id']}`, model).pipe(take(1));
  }

  public deleteBacklog(id: number, token) {
    return this.http.delete(`${environment.API_TICKET}/backlogs/${id}`).pipe(take(1));
  }

  public getByIdBacklog(id: number, token) {
    return this.http.get<BacklogModel>(`${environment.API_TICKET}/backlogs/${id}`).pipe(take(1));
  }



}
