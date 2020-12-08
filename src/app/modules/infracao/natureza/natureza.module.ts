import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


import { AppCommonModule } from './../../../app.common.module';


import { NaturezaService } from './natureza.service';
import { NaturezaRoutingModule } from './natureza-routing.module';
import { ListarComponent } from './listar/listar.component';



@NgModule({
  declarations: [ListarComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    AppCommonModule,
    NaturezaRoutingModule,
  ],
  exports: [ListarComponent],
  providers: [NaturezaService],
})
export class NaturezaModule { }
