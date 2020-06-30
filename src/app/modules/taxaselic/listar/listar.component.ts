import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { ConfirmationService, MessageService } from 'primeng/api';


// MODULO QUE IRÁ TRABALHAR
import { CrudForm } from '../../../shared/class/crud-form';
import { TaxaSelicService } from './../taxaselic.service';
import { TaxaSelicModel } from './../../../shared/models/TaxaSelicModel';


import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localePt, 'pt');


@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class ListarComponent extends CrudForm<TaxaSelicModel> implements OnInit {
  // SÓ PRECISA SETAR ESSAS INFORMAÇÃO
  registro: TaxaSelicModel = {};


  constructor(
    protected fb: FormBuilder,
    protected service: TaxaSelicService,  // SETAR O SERVICE QUE IRÁ TRABALHAR
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {
    super(fb, service);
  }


  ngOnInit(): void {
    this.iniciarForm();

    this.carregarGrid();
  }


  msgErro(array: any) {
    if (array) {
      for (const value of array) {
        this.messageService.add({ severity: 'warn', summary: value.message });
      }
    } else {
      this.messageService.add({ severity: 'error', summary: 'Não foi possível recuperar dados' });
    }
  }

  msgSucesso(mensagem: string) {
    this.messageService.add({ severity: 'success', summary: mensagem });
  }


  delete() {
    this.confirmationService.confirm({
      message: 'Tem certeza de que deseja continuar?',
      header: 'Confirmação de Exclusão',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.onDelete(this.form.value.id);
      }
    });
  }



  // PODE MEXER A PARTIR DESTE PONTO
  iniciarForm() {
    this.form = this.fb.group({
      id: [''],
      ano: ['', Validators.compose([Validators.required, Validators.min(2016)])],
      mes: ['', Validators.compose([Validators.required, Validators.min(1), Validators.max(12)])],
      valor: ['', Validators.compose([Validators.required])],
    });
  }

  getErrorMessageAno() {
    if (this.form.controls.ano.hasError('required')) {
      return 'Campo Requerido';
    } else if (this.form.controls.ano.hasError('min')) {
      return 'Mín. permitido 2016';
    }
    return '';
  }


  getErrorMessageMes() {
    if (this.form.controls.mes.hasError('required')) {
      return 'Campo Requerido';
    } else if (this.form.controls.mes.hasError('min')) {
      return 'Mín. permitido 1';
    } else if (this.form.controls.mes.hasError('max')) {
      return 'Máx. permitido 12';
    }
    return '';
  }

  getErrorMessageValor() {
    if (this.form.controls.valor.hasError('required')) {
      return 'Campo Requerido';
    }
    return '';
  }


  transformarEmData(mes: number){
    return new Date(`2020-${mes}-1`);
  }

}
