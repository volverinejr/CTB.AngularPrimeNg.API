import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


import { AppCommonModule } from '../../../app.common.module';


import { TipoTarefaService } from './tipo-tarefa.service';
import { TipoTarefaRoutingModule } from './tipo-tarefa-routing.module';
import { ListarComponent } from './listar/listar.component';


@NgModule({
  declarations: [ListarComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    AppCommonModule,
    TipoTarefaRoutingModule,
  ],
  exports: [ListarComponent],
  providers: [TipoTarefaService],
})
export class TipoTarefaModule { }
