import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


import { AppCommonModule } from '../../../app.common.module';


import { SprintService } from './sprint.service';
import { SprintRoutingModule } from './sprint-routing.module';
import { ListarComponent } from './listar/listar.component';


@NgModule({
  declarations: [ListarComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    AppCommonModule,
    SprintRoutingModule,
  ],
  exports: [ListarComponent],
  providers: [SprintService],
})
export class SprintModule { }
