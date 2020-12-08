import { GenericPesquisa } from './GenericPesquisa';
import { HttpClient } from '@angular/common/http';
import { take, debounceTime, distinctUntilChanged } from 'rxjs/operators';


export class CrudService<T> {

  constructor(
    protected http: HttpClient,
    private API_URL: string
  ) { }


  public getAll(token, tipo, pagina, qtd, campo, ordem, filtro) {
    // const parametros = `${this.API_URL}/${pagina}/${qtd}/${campo}/${ordem}/${filtro}`;
    const parametros = `${this.API_URL}`;

    return this.http.get<GenericPesquisa>(parametros)
      .pipe(
        take(1),
        debounceTime(2000),
        distinctUntilChanged(),
      );
  }

  public getById(id: string, token) {
    return this.http.get<T>(`${this.API_URL}/${id}`).pipe(take(1));
  }


  public getTotalDeRegistros() {
    return this.http.get<number>(`${this.API_URL}/totalregistros`).pipe(
      take(1),
      debounceTime(2000)
    );
  }



  private create(model: T, token) {
    return this.http.post(`${this.API_URL}`, model).pipe(take(1));
  }

  private update(model: T, token) {
    return this.http.put(`${this.API_URL}/${model['id']}`, model).pipe(take(1));
  }



  public save(model: T, token) {
    // tslint:disable-next-line: no-string-literal
    if (model['id']) {
      return this.update(model, token);
    } else {
      return this.create(model, token);
    }
  }

  public delete(id: string, token) {
    return this.http.delete(`${this.API_URL}/${id}`).pipe(take(1));
  }


}
