import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


import { AppCommonModule } from '../../../app.common.module';


import { InfracaoService } from './infracao.service';
import { InfracaoRoutingModule } from './infracao-routing.module';
import { ListarComponent } from './listar/listar.component';



@NgModule({
  declarations: [ListarComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    AppCommonModule,
    InfracaoRoutingModule,
  ],
  exports: [ListarComponent],
  providers: [InfracaoService],
})
export class InfracaoModule { }
