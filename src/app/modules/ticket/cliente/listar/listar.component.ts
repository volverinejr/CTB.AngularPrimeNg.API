import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { LazyLoadEvent, ConfirmationService, MessageService } from 'primeng/api';

import { CrudForm } from '../../../../shared/class/crud-form';


// MODULO QUE IRÁ TRABALHAR
import { ClienteModel } from '../../../../shared/models/ticket/ClienteModel';
import { ClienteService } from './../cliente.service';
import { ClienteSistemaModel } from 'src/app/shared/models/ticket/ClienteSistemaModel';
import { SistemaService } from '../../sistema/sistema.service';
import { SistemaModel } from 'src/app/shared/models/ticket/SistemaModel';
import { GenericPesquisa } from 'src/app/shared/class/GenericPesquisa';
import { SistemaModule } from '../../sistema/sistema.module';
import { CodigoEntidadeModel } from 'src/app/shared/models/ticket/CodigoEntidadeModel';


@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class ListarComponent extends CrudForm<ClienteModel> implements OnInit {
  // SÓ PRECISA SETAR ESSAS INFORMAÇÃO
  registro: ClienteModel = {};
  sistemasAll: SistemaModel[];
  sistemasDoCliente: ClienteSistemaModel[];

  displayDialogAddSistema: boolean = false;
  dataSouceClienteSistema: ClienteSistemaModel[];
  clienteSistemaModel: ClienteSistemaModel = {};
  totalSistemasDoCliente = 0;
  idClienteSelecionado: number;

  protected pagNumeroSistema = 0;
  protected pagQtdSistema = 10;
  protected pagCampoSistema = 'id';
  protected pagOrdemSistema = 1;
  firstSistema = 0;







  constructor(
    protected fb: FormBuilder,
    protected service: ClienteService,  // SETAR O SERVICE QUE IRÁ TRABALHAR
    protected serviceSistema: SistemaService,
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
      nome: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(100)])],
      ativo: [false, Validators.required],
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


    this.service.getSistemasDoCliente(this.idClienteSelecionado).subscribe(
      (resultSistemasDoCliente: ClienteSistemaModel[]) => {

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
              let sistemaLinha: ClienteSistemaModel = {};
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

    this.service.adicionarSistemaAoCliente(this.idClienteSelecionado, codigoEntidadeModel).subscribe(
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

    this.service.deleteSistemaDoCliente(this.idClienteSelecionado, idSistema).subscribe(
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
