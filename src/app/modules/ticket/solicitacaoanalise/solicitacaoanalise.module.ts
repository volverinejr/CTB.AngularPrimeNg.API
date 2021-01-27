import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


import { AppCommonModule } from '../../../app.common.module';


import { SolicitacaoAnaliseService } from './solicitacaoanalise.service';
import { SolicitacaoAnaliseRoutingModule } from './solicitacaoanalise-routing.module';
import { ListarComponent } from './listar/listar.component';


@NgModule({
  declarations: [ListarComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    AppCommonModule,
    SolicitacaoAnaliseRoutingModule,
  ],
  exports: [ListarComponent],
  providers: [SolicitacaoAnaliseService],
})
export class SolicitacaoAnaliseModule { }
