import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { LazyLoadEvent, ConfirmationService, MessageService } from 'primeng/api';

import { CrudForm } from '../../../../shared/class/crud-form';


// MODULO QUE IRÁ TRABALHAR
import { AgenteModel } from '../../../../shared/models/base/AgenteModel';
import { AgenteService } from './../agente.service';


@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class ListarComponent extends CrudForm<AgenteModel> implements OnInit {
  // SÓ PRECISA SETAR ESSAS INFORMAÇÃO
  registro: AgenteModel = {};


  constructor(
    protected fb: FormBuilder,
    protected service: AgenteService,  // SETAR O SERVICE QUE IRÁ TRABALHAR
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

  msgErroSimples(mensagem: string) {
    this.messageService.add({ severity: 'error', summary: mensagem });
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
      matricula: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(10)])],
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

  getErrorMessageMatricula() {
    if (this.form.controls.matricula.hasError('required')) {
      return 'Campo Requerido';
    } else if (this.form.controls.matricula.hasError('minlength')) {
      return 'Mín. de 6 caracteres';
    } else if (this.form.controls.matricula.hasError('maxLength')) {
      return 'Máx. de 10 caracteres';
    }
    return '';
  }


}
