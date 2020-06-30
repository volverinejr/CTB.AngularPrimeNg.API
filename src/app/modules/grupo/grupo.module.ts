import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


import { AppCommonModule } from './../../app.common.module';


import { GrupoService } from './grupo.service';
import { GrupoRoutingModule } from './grupo-routing.module';
import { ListarComponent } from './listar/listar.component';



@NgModule({
  declarations: [ListarComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    AppCommonModule,
    GrupoRoutingModule,
  ],
  exports: [ListarComponent],
  providers: [GrupoService],
})
export class GrupoModule { }
