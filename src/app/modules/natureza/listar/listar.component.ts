import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { ConfirmationService, MessageService } from 'primeng/api';


// MODULO QUE IRÁ TRABALHAR
import { CrudForm } from '../../../shared/class/crud-form';
import { NaturezaModel } from './../../../shared/models/NaturezaModel';
import { NaturezaService } from './../natureza.service';


import localePt from '@angular/common/locales/pt';
import {registerLocaleData} from '@angular/common';

registerLocaleData(localePt, 'pt');


@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class ListarComponent extends CrudForm<NaturezaModel> implements OnInit {
  // SÓ PRECISA SETAR ESSAS INFORMAÇÃO
  registro: NaturezaModel = {};


  constructor(
    protected fb: FormBuilder,
    protected service: NaturezaService,  // SETAR O SERVICE QUE IRÁ TRABALHAR
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
      nome: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(50)])],
      ponto: ['', Validators.compose([Validators.required, Validators.min(0), Validators.max(7)])],
      valor: ['', Validators.compose([Validators.required, Validators.min(53)])],
      percentualDeDesconto: ['', Validators.compose([Validators.required, Validators.min(0), Validators.max(100)])],
    });
  }
  getErrorMessageNome() {
    if (this.form.controls.nome.hasError('required')) {
      return 'Campo Requerido';
    } else if (this.form.controls.nome.hasError('minlength')) {
      return 'Mín. de 4 caracteres';
    } else if (this.form.controls.nome.hasError('maxLength')) {
      return 'Máx. de 50 caracteres';
    }
    return '';
  }

  getErrorMessagePonto() {
    if (this.form.controls.ponto.hasError('required')) {
      return 'Campo Requerido';
    } else if (this.form.controls.ponto.hasError('min')) {
      return 'Mín. permitido 0';
    } else if (this.form.controls.ponto.hasError('max')) {
      return 'Máx. permitido 7';
    }
    return '';
  }

  getErrorMessageValor() {
    if (this.form.controls.valor.hasError('required')) {
      return 'Campo Requerido';
    } else if (this.form.controls.valor.hasError('min')) {
      return 'Valor Mínimo R$ 53,00';
    }
    return '';
  }


  getErrorMessagePercentualDeDesconto() {
    if (this.form.controls.percentualDeDesconto.hasError('required')) {
      return 'Campo Requerido';
    } else if (this.form.controls.percentualDeDesconto.hasError('min')) {
      return 'Mín. permitido 0';
    } else if (this.form.controls.percentualDeDesconto.hasError('max')) {
      return 'Máx. permitido 100';
    }
    return '';
  }


}
