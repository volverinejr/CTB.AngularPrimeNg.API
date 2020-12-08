import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarComponent } from './listar/listar.component';

const insubsistenciaRoutes: Routes = [
  { path: '', component: ListarComponent }
];

@NgModule({
  imports: [RouterModule.forChild(insubsistenciaRoutes)],
  exports: [RouterModule]
})
export class InsubsistenciaRoutingModule { }
