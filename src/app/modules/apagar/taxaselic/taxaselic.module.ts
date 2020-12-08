import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


import { AppCommonModule } from './../../app.common.module';


import { TaxaSelicService } from './taxaselic.service';
import { TaxaSelicRoutingModule } from './taxaselic-routing.module';
import { ListarComponent } from './listar/listar.component';



@NgModule({
  declarations: [ListarComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    AppCommonModule,
    TaxaSelicRoutingModule,
  ],
  exports: [ListarComponent],
  providers: [TaxaSelicService],
})
export class TaxaSelicModule { }
