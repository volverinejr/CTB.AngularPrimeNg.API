import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


import { AppCommonModule } from '../../../app.common.module';


import { TimeService } from './time.service';
import { TimeRoutingModule } from './time-routing.module';
import { ListarComponent } from './listar/listar.component';


@NgModule({
  declarations: [ListarComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    AppCommonModule,
    TimeRoutingModule,
  ],
  exports: [ListarComponent],
  providers: [TimeService],
})
export class TimeModule { }
