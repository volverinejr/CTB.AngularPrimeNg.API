import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


import { AppCommonModule } from '../../../app.common.module';


import { ArtigoService } from './artigo.service';
import { ArtigoRoutingModule } from './artigo-routing.module';
import { ListarComponent } from './listar/listar.component';



@NgModule({
  declarations: [ListarComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    AppCommonModule,
    ArtigoRoutingModule,
  ],
  exports: [ListarComponent],
  providers: [ArtigoService],
})
export class ArtigoModule { }
