import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { LazyLoadEvent, ConfirmationService, MessageService } from 'primeng/api';

import { CrudForm } from '../../../../shared/class/crud-form';


// MODULO QUE IRÁ TRABALHAR
import { PessoaModel } from '../../../../shared/models/ticket/PessoaModel';
import { PessoaService } from './../pessoa.service';
import { PessoaTimeModel } from 'src/app/shared/models/ticket/PessoaTimeModel';
import { TimeService } from '../../time/time.service';
import { GenericPesquisa } from 'src/app/shared/class/GenericPesquisa';
import { CodigoEntidadeModel } from 'src/app/shared/models/ticket/CodigoEntidadeModel';
import { ClienteModel } from 'src/app/shared/models/ticket/ClienteModel';
import { ClienteService } from '../../cliente/cliente.service';


@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class ListarComponent extends CrudForm<PessoaModel> implements OnInit {
  // SÓ PRECISA SETAR ESSAS INFORMAÇÃO
  registro: PessoaModel = {};
  sistemasAll: PessoaModel[];
  sistemasDoCliente: PessoaTimeModel[];

  clientes: ClienteModel[];
  clienteSelecionado: ClienteModel = {};


  displayDialogAddSistema: boolean = false;
  dataSouceClienteSistema: PessoaTimeModel[];
  clienteSistemaModel: PessoaTimeModel = {};
  totalSistemasDoCliente = 0;
  idClienteSelecionado: number;

  protected pagNumeroSistema = 0;
  protected pagQtdSistema = 10;
  protected pagCampoSistema = 'id';
  protected pagOrdemSistema = 1;
  firstSistema = 0;







  constructor(
    protected fb: FormBuilder,
    protected service: PessoaService,  // SETAR O SERVICE QUE IRÁ TRABALHAR
    protected serviceSistema: TimeService,
    protected serviceCliente: ClienteService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {
    super(fb, service);
  }


  ngOnInit(): void {
    this.iniciarForm();

    this.carregarGrid();

    this.carregarSistemas();
  }



  carregarSistemas() {
    this.carregando = true;

    this.serviceCliente.getAll('', 'All', 0, 100, 'nome', '1', '').subscribe(
      (res: GenericPesquisa) => {

        this.clientes = res.content;


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
      nome: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(100)])],
      ativo: [false, Validators.required],
      cliente:[],
    });
  }
  getErrorMessageNome() {
    if (this.form.controls.nome.hasError('required')) {
      return 'Campo Requerido';
    } else if (this.form.controls.nome.hasError('minlength')) {
      return 'Mín. de 4 caracteres';
    } else if (this.form.controls.nome.hasError('maxLength')) {
      return 'Máx. de 100 caracteres';
    }
    return '';
  }


  AddSistema(idCliente: number) {
    this.idClienteSelecionado = idCliente;
    this.pagNumeroSistema = 0;
    this.pagQtdSistema = 5;
    this.pagCampoSistema = 'id';
    this.pagOrdemSistema = 1;
    this.firstSistema = 0;



    this.carregarGridSistema();
  }



  lazyLoadSistema(event: any) {

    this.pagNumeroSistema = ((event.first + event.rows) / event.rows) - 1;
    this.pagQtdSistema = event.rows;

    if (event.sortField === undefined) {
      this.pagCampoSistema = 'Id';
    } else {
      this.pagCampoSistema = event.sortField;
    }
    this.pagOrdemSistema = event.sortOrder;


    this.carregarGridSistema();
  }


  protected carregarGridSistema() {
    this.carregando = true;


    this.service.getTimesDaPessoa(this.idClienteSelecionado).subscribe(
      (resultSistemasDoCliente: PessoaTimeModel[]) => {

        //Separando os ids dos sistemas vinculados ao cliente
        var sistemasIds = [];
        for (var data in resultSistemasDoCliente) {
          sistemasIds.push(resultSistemasDoCliente[data].id);
        }


        this.serviceSistema.getAll(null, 'All', this.pagNumeroSistema, this.pagQtdSistema, this.pagCampoSistema, this.pagOrdemSistema, '').subscribe(
          (resultSistemas: GenericPesquisa) => {

            this.totalSistemasDoCliente = resultSistemas.totalElements;
            this.sistemasDoCliente = [];

            for (let linha of resultSistemas.content) {
              let sistemaLinha: PessoaTimeModel = {};
              sistemaLinha.id = linha.id;
              sistemaLinha.nome = linha.nome;
              sistemaLinha.cadastrado = sistemasIds.includes(linha.id);

              this.sistemasDoCliente.push(sistemaLinha);
            }

            this.displayDialogAddSistema = true;


            this.carregando = false;
          },
          (error: any) => {
            this.carregando = false;
            this.msgErro(error.error.data);
          }
        );




      },
      (error: any) => {
        this.carregando = false;
        this.msgErro(error.error.data);
      }
    );

  }



  AddSistemaCliente(idSistema: number) {
    this.carregando = true;

    let codigoEntidadeModel: CodigoEntidadeModel = {};
    codigoEntidadeModel.id = idSistema;

    this.service.adicionarTimeAPessoa(this.idClienteSelecionado, codigoEntidadeModel).subscribe(
      (result: any) => {

        for (var data in this.sistemasDoCliente) {
          if (this.sistemasDoCliente[data].id == idSistema) {
            this.sistemasDoCliente[data].cadastrado = true;
          }
        }

        this.carregando = false;
      },
      (error: any) => {
        this.carregando = false;
        this.msgErro(error.error.data);
      }
    );

  }

  RemoverSistemaCliente(idSistema: number) {
    this.carregando = true;

    this.service.deleteTimeDaPessoa(this.idClienteSelecionado, idSistema).subscribe(
      (result: any) => {

        for (var data in this.sistemasDoCliente) {
          if (this.sistemasDoCliente[data].id == idSistema) {
            this.sistemasDoCliente[data].cadastrado = false;
          }
        }

        this.carregando = false;
      },
      (error: any) => {
        this.carregando = false;
        this.msgErro(error.error.data);
      }
    );
  }



}
