import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


import { AppCommonModule } from '../../../app.common.module';


import { SistemaService } from './sistema.service';
import { SistemaRoutingModule } from './sistema-routing.module';
import { ListarComponent } from './listar/listar.component';


@NgModule({
  declarations: [ListarComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    AppCommonModule,
    SistemaRoutingModule,
  ],
  exports: [ListarComponent],
  providers: [SistemaService],
})
export class SistemaModule { }
