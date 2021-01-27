import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { LazyLoadEvent, ConfirmationService, MessageService } from 'primeng/api';

import { CrudForm } from '../../../../shared/class/crud-form';


// MODULO QUE IRÁ TRABALHAR
import { SprintModel } from '../../../../shared/models/ticket/SprintModel';
import { SprintService } from './../sprint.service';
import { TimeService } from '../../time/time.service';


import localePt from '@angular/common/locales/pt';
import { DatePipe, registerLocaleData } from '@angular/common';
import { TimeModel } from 'src/app/shared/models/ticket/TimeModel';
import { GenericPesquisa } from 'src/app/shared/class/GenericPesquisa';
import { SolicitacaoService } from '../../solicitacao/solicitacao.service';
import { SolicitacaoModel } from 'src/app/shared/models/ticket/SolicitacaoModel';


registerLocaleData(localePt, 'pt');

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css'],
  providers: [ConfirmationService, MessageService, DatePipe]
})
export class ListarComponent extends CrudForm<SprintModel> implements OnInit {
  // SÓ PRECISA SETAR ESSAS INFORMAÇÃO
  registro: SprintModel = {};
  times: TimeModel[];

  pt: any;

  displayDialogBacklogSprint: boolean;
  sprintSelecionada: number;


  carregandoPrioridade: boolean;
  dataSoucePrioridade: SolicitacaoModel[];
  totalRecordsPrioridade = 0;




  constructor(
    protected fb: FormBuilder,
    protected service: SprintService,  // SETAR O SERVICE QUE IRÁ TRABALHAR
    protected serviceTime: TimeService,
    protected serviceSolicitacao: SolicitacaoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    public datepipe: DatePipe,
  ) {
    super(fb, service);
  }


  ngOnInit(): void {
    this.iniciarForm();

    this.carregarGrid();

    this.carregarTimes();

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

  carregarTimes(){
    this.carregando = true;

    this.serviceTime.getAll(null, 'All', 0, 100, 'id', '1', '').subscribe(
      (res: GenericPesquisa) => {

        this.times = res.content;

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
      time: ['', Validators.compose([Validators.required])],
      dataInicioFormatada: ['', Validators.compose([Validators.required])],
      dataFimFormatada: ['', Validators.compose([Validators.required])],
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

  getErrorMessageTime() {
    if (this.form.controls.time.hasError('required')) {
      return 'Campo Requerido';
    }
    return '';
  }

  getErrorMessageDataInicioFormatada() {
    if (this.form.controls.dataInicioFormatada.hasError('required')) {
      return 'Campo Requerido';
    }
    return '';
  }

  getErrorMessageDataFimFormatada() {
    if (this.form.controls.dataFimFormatada.hasError('required')) {
      return 'Campo Requerido';
    }
    return '';
  }


  save() {
    if (this.form.valid) {
      let mensagem = 'Cadastrado';

      if (this.form.value.id) {
        mensagem = 'Atualizado';
      }

      this.registro = this.form.value;

      if (this.form.controls.dataInicioFormatada.dirty) {
        let prazoTemp: Date = this.form.controls.dataInicioFormatada.value;
        let inicioFormatado: string = this.datepipe.transform(prazoTemp, 'yyyy-MM-dd');

        this.registro.dataInicio = inicioFormatado + 'T10:00:00.000+00:00';

      } else {
        let separandoData = this.form.controls.dataInicioFormatada.value.split('/');

        this.registro.dataInicio = separandoData[2] + '-' + separandoData[1] + '-' + separandoData[0] + 'T10:00:00.000+00:00';
      }



      if (this.form.controls.dataFimFormatada.dirty) {
        let prazoTemp: Date = this.form.controls.dataFimFormatada.value;
        let fimFormatado: string = this.datepipe.transform(prazoTemp, 'yyyy-MM-dd');

        this.registro.dataFim = fimFormatado + 'T10:00:00.000+00:00';

      } else {
        let separandoData = this.form.controls.dataFimFormatada.value.split('/');

        this.registro.dataFim = separandoData[2] + '-' + separandoData[1] + '-' + separandoData[0] + 'T10:00:00.000+00:00';
      }



      this.service.save(this.registro, '').subscribe(
        (res: any) => {
          this.msgSucesso(mensagem);

          this.registro = null;
          this.carregarGrid();
          this.displayDialog = false;
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


  carregarGridAnaliePrioridade(prioridade: number){

    this.carregando = true;

    this.serviceSolicitacao.getAnalisePrioridade(prioridade).subscribe(
      (res: GenericPesquisa) => {

        this.dataSoucePrioridade = res.content;

        this.carregando = false;
      },
      (error: any) => {
        this.carregando = false;
        this.msgErro(error.error.data);
      }
    );

  }


  addBacklogASprint(id: number){
    this.sprintSelecionada = id;
    this.displayDialogBacklogSprint = true;
  }


  lazyLoadPrioridade(event: any) {
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


}
