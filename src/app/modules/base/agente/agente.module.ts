import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


import { AppCommonModule } from '../../../app.common.module';


import { AgenteService } from './agente.service';
import { AgenteRoutingModule } from './agente-routing.module';
import { ListarComponent } from './listar/listar.component';


@NgModule({
  declarations: [ListarComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    AppCommonModule,
    AgenteRoutingModule,
  ],
  exports: [ListarComponent],
  providers: [AgenteService],
})
export class AgenteModule { }
