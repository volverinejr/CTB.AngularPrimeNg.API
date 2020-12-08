import { GrupoModel } from './../../../shared/models/GrupoModel';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { LazyLoadEvent, ConfirmationService, MessageService } from 'primeng/api';

import { CrudForm } from '../../../shared/class/crud-form';


// MODULO QUE IRÁ TRABALHAR
import { InfracaoModel } from './../../../shared/models/InfracaoModel';
import { InfracaoService } from './../infracao.service';
import { GrupoService } from './../../grupo/grupo.service';
import { NaturezaService } from '../../natureza/natureza.service';
import { GenericPesquisa } from 'src/app/shared/class/GenericPesquisa';
import { NaturezaModel } from 'src/app/shared/models/NaturezaModel';

import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

import { SelectItem } from 'primeng/api';


registerLocaleData(localePt, 'pt');


@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css'],
  providers: [ConfirmationService, MessageService],
})


export class ListarComponent extends CrudForm<InfracaoModel> implements OnInit {
  // SÓ PRECISA SETAR ESSAS INFORMAÇÃO
  registro: InfracaoModel = {};

  grupoModel: GrupoModel[];
  comboGrupo: GrupoModel;


  naturezaModel: NaturezaModel[];
  comboNatureza: NaturezaModel;


  cars: SelectItem[];
  selectedCar: string;


  constructor(
    protected fb: FormBuilder,

    protected service: InfracaoService,  // SETAR O SERVICE QUE IRÁ TRABALHAR
    protected serviceGrupo: GrupoService,
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
      codigo: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(5)])],
      descricao: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(500)])],
      amparoLegal: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(100)])],
      medidaAdm: ['', Validators.compose([Validators.required, Validators.maxLength(100)])],
      crime: [false],
      obsObrigatoria: [false],
      grupoId: ['', Validators.compose([Validators.required])],
      naturezaId: ['', Validators.compose([Validators.required])],
      competenciaMunicipal: [false],
      competenciaEstadual: [false],
      competenciaRodoviaria: [false],
      infratorCondutor: [false],
      infratorProprietario: [false],
      validadeInicio: ['', Validators.compose([Validators.required])],
    });
  }
  getErrorMessageCodigo() {
    if (this.form.controls.codigo.hasError('required')) {
      return 'Campo Requerido';
    } else if (this.form.controls.codigo.hasError('minlength')) {
      return 'Tem que ter 5 caracteres';
    } else if (this.form.controls.codigo.hasError('maxLength')) {
      return 'Tem que ter 5 caracteres';
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

  getErrorMessageAmparoLegal() {
    if (this.form.controls.amparoLegal.hasError('required')) {
      return 'Campo Requerido';
    } else if (this.form.controls.amparoLegal.hasError('minlength')) {
      return 'Mín. de 5 caracteres';
    } else if (this.form.controls.amparoLegal.hasError('maxLength')) {
      return 'Máx. de 100 caracteres';
    }
    return '';
  }

  getErrorMessageMedidaAdm() {
    if (this.form.controls.medidaAdm.hasError('required')) {
      return 'Campo Requerido';
    } else if (this.form.controls.medidaAdm.hasError('maxLength')) {
      return 'Máx. de 100 caracteres';
    }
    return '';
  }

  getErrorMessageGrupoId() {
    if (this.form.controls.grupoId.hasError('required')) {
      return 'Campo Requerido';
    }
    return '';
  }

  getErrorMessageNaturezaId() {
    if (this.form.controls.naturezaId.hasError('required')) {
      return 'Campo Requerido';
    }
    return '';
  }

  getErrorMessageValidadeInicio() {
    if (this.form.controls.validadeInicio.hasError('required')) {
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


  carregarNatureza() {
    this.serviceNatureza.getAll('', '', 0, 500, 'Nome', 1, '').subscribe(
      (res: GenericPesquisa) => {
        this.naturezaModel = res.content;


/*         this.cars = [
          { label: 'Audi', value: 'Audi' },
          { label: 'BMW', value: 'BMW' },
          { label: 'Fiat', value: 'Fiat' },
          { label: 'Ford', value: 'Ford' },
          { label: 'Honda', value: 'Honda' },
          { label: 'Jaguar', value: 'Jaguar' },
          { label: 'Mercedes', value: 'Mercedes' },
          { label: 'Renault', value: 'Renault' },
          { label: 'VW', value: 'VW' },
          { label: 'Volvo', value: 'Volvo' },
        ]; */
      },
      (error: any) => {
        this.msgErro(error.error.data);
      }
    );
  }



  save() {
    if (this.form.valid) {
      let mensagem = 'Cadastrado';

      if (this.form.value.id) {
        mensagem = 'Atualizado';
      }


      if (!this.form.controls.crime.value) {
        this.form.controls.crime.setValue(false);
      }

      if (!this.form.controls.obsObrigatoria.value) {
        this.form.controls.obsObrigatoria.setValue(false);
      }



      if (!this.form.controls.competenciaMunicipal.value) {
        this.form.controls.competenciaMunicipal.setValue(false);
      }
      if (!this.form.controls.competenciaEstadual.value) {
        this.form.controls.competenciaEstadual.setValue(false);
      }
      if (!this.form.controls.competenciaRodoviaria.value) {
        this.form.controls.competenciaRodoviaria.setValue(false);
      }


      if (!this.form.controls.infratorCondutor.value) {
        this.form.controls.infratorCondutor.setValue(false);
      }
      if (!this.form.controls.infratorProprietario.value) {
        this.form.controls.infratorProprietario.setValue(false);
      }


      this.form.controls.grupoId.setValue(this.form.controls.grupoId.value.id);
      this.form.controls.naturezaId.setValue(this.form.controls.naturezaId.value.id);


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





  onGetById(id: string) {

    this.service.getById(id, '').subscribe(
      (res: InfracaoModel) => {
        this.newRegistro = false;
        this.registro = res;


        this.registro.validadeInicio = new Date(this.registro.validadeInicio);


        this.form.patchValue(this.registro);


        this.comboGrupo = res.grupo;

        this.comboNatureza = res.natureza;

        this.displayDialog = true;
      },
      (error: any) => {
        this.msgErro(error.error.data);
      }
    );
  }


}
