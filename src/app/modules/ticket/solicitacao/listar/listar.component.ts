import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { LazyLoadEvent, ConfirmationService, MessageService } from 'primeng/api';

import { CrudForm } from '../../../../shared/class/crud-form';


// MODULO QUE IRÁ TRABALHAR
import { SolicitacaoModel } from '../../../../shared/models/ticket/SolicitacaoModel';
import { SolicitacaoService } from './../solicitacao.service';
import { SistemaService } from '../../sistema/sistema.service';
import { SistemaModel } from 'src/app/shared/models/ticket/SistemaModel';
import { GenericPesquisa } from 'src/app/shared/class/GenericPesquisa';
import { PessoaModel } from 'src/app/shared/models/ticket/PessoaModel';
import { PessoaService } from '../../pessoa/pessoa.service';


@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class ListarComponent extends CrudForm<SolicitacaoModel> implements OnInit {
  // SÓ PRECISA SETAR ESSAS INFORMAÇÃO
  registro: SolicitacaoModel = {};

  sistemas: SistemaModel[];

  pessoas: PessoaModel[];


  constructor(
    protected fb: FormBuilder,
    protected service: SolicitacaoService,  // SETAR O SERVICE QUE IRÁ TRABALHAR
    protected serviceSistema: SistemaService,
    protected servicePessoa: PessoaService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {
    super(fb, service);
  }


  ngOnInit(): void {
    this.iniciarForm();

    this.carregarGrid();

    this.carregarSistemas();

    this.carregarPessoas();
  }

  carregarSistemas() {
    this.carregando = true;

    this.serviceSistema.getAll('', 'All', 0, 100, 'nome', '1', '').subscribe(
      (res: GenericPesquisa) => {

        this.sistemas = res.content;

        this.carregando = false;
      },
      (error: any) => {
        this.carregando = false;
        this.msgErro(error.error.data);
      }

    );
  }


  carregarPessoas() {
    this.carregando = true;

    this.servicePessoa.getAll('', 'All', 0, 100, 'nome', '1', '').subscribe(
      (res: GenericPesquisa) => {

        this.pessoas = res.content;

        this.carregando = false;
      },
      (error: any) => {
        this.carregando = false;
        this.msgErro(error.error.data);
      }

    );
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
      descricao: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(500)])],
      pessoa: [false, Validators.required],
      sistema: [false, Validators.required],
    });
  }
  getErrorMessageDescricao() {
    if (this.form.controls.descricao.hasError('required')) {
      return 'Campo Requerido';
    } else if (this.form.controls.descricao.hasError('minlength')) {
      return 'Mín. de 4 caracteres';
    } else if (this.form.controls.descricao.hasError('maxLength')) {
      return 'Máx. de 500 caracteres';
    }
    return '';
  }

  getErrorMessagePessoa() {
    if (this.form.controls.pessoa.hasError('required')) {
      return 'Campo Requerido';
    }
    return '';
  }

  getErrorMessageSistema() {
    if (this.form.controls.sistema.hasError('required')) {
      return 'Campo Requerido';
    }
    return '';
  }


}
