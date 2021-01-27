import { GenericPesquisa } from './../../../../shared/class/GenericPesquisa';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';

import { LazyLoadEvent, ConfirmationService, MessageService } from 'primeng/api';

import { CrudForm } from '../../../../shared/class/crud-form';


// MODULO QUE IRÁ TRABALHAR
import { InfracaoModel } from '../../../../shared/models/infracao/InfracaoModel';
import { GrupoModel } from './../../../../shared/models/infracao/GrupoModel';
import { ArtigoModel } from './../../../../shared/models/infracao/ArtigoModel';
import { NaturezaModel } from './../../../../shared/models/NaturezaModel';

import { InfracaoService } from './../infracao.service';
import { NaturezaService } from './../../natureza/natureza.service';
import { GrupoService } from './../../grupo/grupo.service';
import { ArtigoService } from './../../artigo/artigo.service';


import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';


registerLocaleData(localePt, 'pt');


@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class ListarComponent extends CrudForm<InfracaoModel> implements OnInit {
  // SÓ PRECISA SETAR ESSAS INFORMAÇÃO
  registro: InfracaoModel = {};

  grupoModel: GrupoModel[];
  artigoModel: ArtigoModel[];
  naturezaModel: NaturezaModel[];



  constructor(
    protected fb: FormBuilder,
    protected service: InfracaoService,  // SETAR O SERVICE QUE IRÁ TRABALHAR
    protected serviceGrupo: GrupoService,
    protected serviceArtigo: ArtigoService,
    protected serviceNatureza: NaturezaService,

    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {
    super(fb, service);
  }


  ngOnInit(): void {
    this.iniciarForm();

    this.carregarGrid();

    this.carregarGrupo();

    this.carregarArtigo();

    this.carregarNatureza();
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
      codigo: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(6)])],
      descricao: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(500)])],
      amparoLegal: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(500)])],
      medidaAdm: [''],
      crime: [false],
      obsObrigatoria: [false],
      artigo: ['', Validators.compose([Validators.required])],
      grupo: [, Validators.compose([Validators.required])],
      natureza: ['', Validators.compose([Validators.required])],
      competenciaMunicipal: [false],
      competenciaEstadual: [false],
      competenciaRodoviaria: [false],
      podeApresentarCondutorInfrator: [false],
      validadeInicioFormatada: ['', Validators.compose([Validators.required])],
      validadeFim: [],

    });
  }
  getErrorMessageCodigo() {
    if (this.form.controls.codigo.hasError('required')) {
      return 'Campo Requerido';
    } else if (this.form.controls.codigo.hasError('minlength')) {
      return 'Mín. de 6 caracteres';
    } else if (this.form.controls.codigo.hasError('maxLength')) {
      return 'Máx. de 6 caracteres';
    }
    return '';
  }

  getErrorMessageAmparoLegal() {
    if (this.form.controls.amparoLegal.hasError('required')) {
      return 'Campo Requerido';
    } else if (this.form.controls.amparoLegal.hasError('minlength')) {
      return 'Mín. de 10 caracteres';
    } else if (this.form.controls.amparoLegal.hasError('maxLength')) {
      return 'Máx. de 500 caracteres';
    }
    return '';
  }

  getErrorMessageMedidaAdm() {
    if (this.form.controls.medidaAdm.hasError('required')) {
      return 'Campo Requerido';
    } else if (this.form.controls.medidaAdm.hasError('minlength')) {
      return 'Mín. de 10 caracteres';
    } else if (this.form.controls.medidaAdm.hasError('maxLength')) {
      return 'Máx. de 500 caracteres';
    }
    return '';
  }


  getErrorMessageDescricao() {
    if (this.form.controls.descricao.hasError('required')) {
      return 'Campo Requerido';
    } else if (this.form.controls.descricao.hasError('minlength')) {
      return 'Mín. de 10 caracteres';
    } else if (this.form.controls.descricao.hasError('maxLength')) {
      return 'Máx. de 500 caracteres';
    }
    return '';
  }


  getErrorMessageGrupo() {
    if (this.form.controls.grupo.hasError('required')) {
      return 'Campo Requerido';
    }
    return '';
  }

  getErrorMessageValidadeInicioFormatada() {
    if (this.form.controls.validadeInicioFormatada.hasError('required')) {
      return 'Campo Requerido';
    }
    return '';
  }

  carregarGrupo() {
    this.serviceGrupo.getAll('', '', 0, 500, 'Nome', 1, '').subscribe(
      (res: GenericPesquisa) => {

        this.grupoModel = res.content;
      },
      (error: any) => {
        this.msgErro(error.error.data);
      }
    );
  }

  carregarArtigo() {
    this.serviceArtigo.getAll('', '', 0, 500, 'Nome', 1, '').subscribe(
      (res: GenericPesquisa) => {

        this.artigoModel = res.content;
      },
      (error: any) => {
        this.msgErro(error.error.data);
      }
    );
  }

  carregarNatureza() {
    this.serviceNatureza.getAll('', '', 0, 500, 'Nome', 1, '').subscribe(
      (res: GenericPesquisa) => {

        this.naturezaModel = res.content;
      },
      (error: any) => {
        this.msgErro(error.error.data);
      }
    );
  }


}
