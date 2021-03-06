import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


import { AppCommonModule } from '../../../app.common.module';


import { PessoaService } from './pessoa.service';
import { PessoaRoutingModule } from './pessoa-routing.module';
import { ListarComponent } from './listar/listar.component';


@NgModule({
  declarations: [ListarComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    AppCommonModule,
    PessoaRoutingModule,
  ],
  exports: [ListarComponent],
  providers: [PessoaService],
})
export class PessoaModule { }
