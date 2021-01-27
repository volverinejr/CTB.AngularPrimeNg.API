import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


import { AppCommonModule } from '../../../app.common.module';


import { ClienteService } from './cliente.service';
import { ClienteRoutingModule } from './cliente-routing.module';
import { ListarComponent } from './listar/listar.component';


@NgModule({
  declarations: [ListarComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    AppCommonModule,
    ClienteRoutingModule,
  ],
  exports: [ListarComponent],
  providers: [ClienteService],
})
export class ClienteModule { }
