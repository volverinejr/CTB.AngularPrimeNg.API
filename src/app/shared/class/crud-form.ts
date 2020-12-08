import { GenericPesquisa } from './GenericPesquisa';
import { Pipe } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';

export abstract class CrudForm<T> {
  protected pagNumero = 0;
  protected pagQtd = 10;
  protected pagCampo = 'id';
  protected pagOrdem = 1;
  protected pagFiltro = '';
  carregando: boolean;
  totalRecords = 0;
  newRegistro: boolean;
  form: FormGroup;
  displayDialog: boolean;

  dataSouce: T[];
  registro: any = {};



  constructor(
    protected fb: FormBuilder,
    protected service: any
  ) {
  }

  add(registro: any) {
    this.newRegistro = true;
    registro = {};
    this.form.reset();

    this.displayDialog = true;
  }


  protected carregarGrid() {
    this.carregando = true;

    this.service.getAll(null, 'All', this.pagNumero, this.pagQtd, this.pagCampo, this.pagOrdem, this.pagFiltro).subscribe(
      (res: GenericPesquisa) => {

        this.dataSouce = res.content;
        this.totalRecords = res.totalElements;

        this.carregando = false;
      },
      (error: any) => {
        this.carregando = false;
        this.msgErro(error.error.data);
      }
    );
  }


  lazyLoad(event: any) {
    const filtroGlobal = event.globalFilter;

    this.pagNumero = ((event.first + event.rows) / event.rows) - 1;
    this.pagQtd = event.rows;

    if (event.sortField === undefined) {
      this.pagCampo = 'Id';
    } else {
      this.pagCampo = event.sortField;
    }
    this.pagOrdem = event.sortOrder;
    this.pagFiltro = '';



    if (filtroGlobal) {
      this.pagFiltro = filtroGlobal;

      this.carregarGrid();
    } else {
      this.carregarGrid();
    }
  }


  protected onGetById(id: string) {

    this.service.getById(id, '').subscribe(
      (res: T) => {
        this.newRegistro = false;
        this.registro = res;

        this.form.patchValue(this.registro);

        this.displayDialog = true;
      },
      (error: any) => {
        this.msgErro(error.error.data);
      }
    );
  }

  editar(id: string) {
    this.onGetById(id);
  }


  save() {
    if (this.form.valid) {
      let mensagem = 'Cadastrado';

      if (this.form.value.id) {
        mensagem = 'Atualizado';
      }

      this.service.save(this.form.value, '').subscribe(
        (res: any) => {
          this.msgSucesso(mensagem);

          this.registro = null;
          this.carregarGrid();
          this.displayDialog = false;
        },
        (error: any) => {
          this.msgErro(error.error.data);
        }
      );
    }
  }


  protected onDelete(id: any) {

    this.service.delete(id, '').subscribe(
      () => {
        this.msgSucesso('Removido');

        this.registro = null;
        this.carregarGrid();
        this.displayDialog = false;
      },
      (error: any) => {
        this.msgErro(error.error.data);
      }
    );

  }

  abstract msgErro(array: any);

  abstract msgSucesso(mensagem: string);

  abstract iniciarForm();

  abstract delete();
}
