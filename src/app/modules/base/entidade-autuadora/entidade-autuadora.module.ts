import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


import { AppCommonModule } from './../../../app.common.module';


import { EntidadeAutuadoraService } from './entidade-autuadora.service';
import { EntidadeAutuadoraRoutingModule } from './entidade-autuadora-routing.module';
import { ListarComponent } from './listar/listar.component';



@NgModule({
  declarations: [ListarComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    AppCommonModule,
    EntidadeAutuadoraRoutingModule,
  ],
  exports: [ListarComponent],
  providers: [EntidadeAutuadoraService],
})
export class EntidadeAutuadoraModule { }
