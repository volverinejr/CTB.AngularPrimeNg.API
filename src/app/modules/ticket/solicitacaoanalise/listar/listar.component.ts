import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { LazyLoadEvent, ConfirmationService, MessageService } from 'primeng/api';

import { CrudForm } from '../../../../shared/class/crud-form';

// MODULO QUE IRÁ TRABALHAR
import { SolicitacaoAnaliseModel } from 'src/app/shared/models/ticket/SolicitacaoAnaliseModel';
import { SolicitacaoAnaliseService } from '../solicitacaoanalise.service';
import { SistemaService } from '../../sistema/sistema.service';
import { SistemaModel } from 'src/app/shared/models/ticket/SistemaModel';
import { GenericPesquisa } from 'src/app/shared/class/GenericPesquisa';
import { PessoaModel } from 'src/app/shared/models/ticket/PessoaModel';
import { PessoaService } from '../../pessoa/pessoa.service';

import localePt from '@angular/common/locales/pt';
import { DatePipe, registerLocaleData } from '@angular/common';
import { BacklogService } from '../backlog.service';
import { BacklogModel } from 'src/app/shared/models/ticket/BacklogModel';


registerLocaleData(localePt, 'pt-BR');

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css'],
  providers: [ConfirmationService, MessageService, DatePipe],
})
export class ListarComponent extends CrudForm<SolicitacaoAnaliseModel> implements OnInit {
  // SÓ PRECISA SETAR ESSAS INFORMAÇÃO
  registro: SolicitacaoAnaliseModel = {};

  sistemas: SistemaModel[];

  pessoas: PessoaModel[];

  prioridades: any[];

  pt: any;

  //===================

  formBacklog: FormGroup;
  displayDialogBacklog: boolean;
  solicitacaoSelecionada: number;

  dataSouceBacklog: BacklogModel[];

  totalRecordsBacklog = 0;


  pagNumeroBacklog = 0;
  pagQtdBacklog = 10;
  pagCampoBacklog = 'id';
  pagOrdemBacklog = 1;
  pagFiltroBacklog = '';


  carregandoBacklog: boolean;

  //===================


  constructor(
    protected fb: FormBuilder,
    protected service: SolicitacaoAnaliseService,  // SETAR O SERVICE QUE IRÁ TRABALHAR
    protected serviceSistema: SistemaService,
    protected servicePessoa: PessoaService,
    protected serviceBacklog: BacklogService,

    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    public datepipe: DatePipe,
  ) {
    super(fb, service);
  }


  ngOnInit(): void {
    this.iniciarForm();

    this.carregarGrid();

    this.carregarSistemas();

    this.carregarPessoas();

    this.prioridades = [
      { nome: '1', value: '1' },
      { nome: '2', value: '2' },
      { nome: '3', value: '3' },
    ];

    this.pt = {
      firstDayOfWeek: 0,
      dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
      dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
      dayNamesMin: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
      monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
        'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      today: 'Hoje',
      clear: 'Limpar'
    }

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
      descricao: [{ value: '', reanonly: true }],
      pessoa: [{ value: '', disabled: true }],
      sistema: [{ value: '', disabled: true }],

      prazoExpectativaFormatada: ['', Validators.required],
      analiseRisco: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(500)])],
      prioridade: ['', Validators.required],
    });


    this.formBacklog = this.fb.group({
      id: [''],
      descricao: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(500)])],
    });


  }
  getErrorMessageAnaliseRisco() {
    if (this.form.controls.analiseRisco.hasError('required')) {
      return 'Campo Requerido';
    } else if (this.form.controls.analiseRisco.hasError('minlength')) {
      return 'Mín. de 4 caracteres';
    } else if (this.form.controls.analiseRisco.hasError('maxLength')) {
      return 'Máx. de 500 caracteres';
    }
    return '';
  }


  getErrorMessagePrazoExpectativaFormatada() {
    if (this.form.controls.prazoExpectativaFormatada.hasError('required')) {
      return 'Campo Requerido';
    }
    return '';
  }


  saveAnalise() {
    if (this.form.valid) {
      let mensagem = 'Analisado';

      if (this.form.controls.prazoExpectativaFormatada.dirty) {
        let prazoTemp: Date = this.form.controls.prazoExpectativaFormatada.value;
        let prazoFormatado: string = this.datepipe.transform(prazoTemp, 'yyyy-MM-dd');

        this.registro.prazoExpectativa = prazoFormatado;

      } else {
        let separandoData = this.form.controls.prazoExpectativaFormatada.value.split('/');

        this.registro.prazoExpectativa = separandoData[2] + '-' + separandoData[1] + '-' + separandoData[0];
      }


      this.registro.analiseRisco = this.form.controls.analiseRisco.value;
      this.registro.prioridade = this.form.controls.prioridade.value;


      this.service.analise(this.registro).subscribe(
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


  addBackLog(idSolicitacao: number){
    this.solicitacaoSelecionada = idSolicitacao;

    this.formBacklog.reset();

    this.displayDialogBacklog = true;


    this.carregarGridBacklog();
  }

  saveBacklog() {
    if (this.formBacklog.valid) {
      let mensagem = 'Cadastrado';

      if (this.formBacklog.value.id) {
        mensagem = 'Atualizado';
      }

      let registroBacklog: BacklogModel = {};

      registroBacklog = this.formBacklog.value;
      registroBacklog.idSolicitacao = this.solicitacaoSelecionada;

      this.serviceBacklog.save(registroBacklog, '').subscribe(
        (res: any) => {
          this.msgSucesso(mensagem);

          this.formBacklog.reset();

          this.carregarGridBacklog();
        },
        (error: any) => {
          if (error.error.code == "404") {
            this.msgErroSimples(error.error.msg);
          }
          else {
            this.msgErro(error.error.erros);
          }
        }
      );


    }

  }


  lazyLoadBacklog(event: any) {
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

  carregarGridBacklog() {
    this.carregandoBacklog = true;

    this.serviceBacklog.getBacklogsDaSolicitacao(this.solicitacaoSelecionada, this.pagNumeroBacklog, this.pagQtdBacklog, this.pagCampoBacklog, this.pagOrdemBacklog, this.pagFiltroBacklog).subscribe(
      (res: GenericPesquisa) => {

        this.dataSouceBacklog = res.content;
        this.totalRecordsBacklog = res.totalElements;

        this.carregandoBacklog = false;
      },
      (error: any) => {
        this.carregandoBacklog = false;
        this.msgErro(error.error.data);
      }
    );
  }


  editarBacklog(id: number){
    let registroBacklog: BacklogModel = {};
    this.carregandoBacklog=true;


    this.serviceBacklog.getByIdBacklog(id, '').subscribe(
      (res: BacklogModel) => {
        this.formBacklog.reset();

        this.formBacklog.patchValue(res);

        this.carregandoBacklog=false;
      },
      (error: any) => {
        this.carregandoBacklog=false;

        this.msgErro(error.error.data);
      }
    );


  }

  removerBacklog(id: number){
    this.carregandoBacklog=true;


    this.serviceBacklog.deleteBacklog(id, '').subscribe(
      () => {
        this.msgSucesso('Removido');

        this.carregandoBacklog=false;

        this.formBacklog.reset();

        this.carregarGridBacklog();
      },
      (error: any) => {
        this.carregandoBacklog=false;
        this.msgErro(error.error.data);
      }
    );


  }







}
