import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


import { AppCommonModule } from '../../../app.common.module';


import { SolicitacaoService } from './solicitacao.service';
import { SolicitacaoRoutingModule } from './solicitacao-routing.module';
import { ListarComponent } from './listar/listar.component';


@NgModule({
  declarations: [ListarComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    AppCommonModule,
    SolicitacaoRoutingModule,
  ],
  exports: [ListarComponent],
  providers: [SolicitacaoService],
})
export class SolicitacaoModule { }
