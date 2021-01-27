import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarComponent } from './listar/listar.component';

const tipoTarefaRoutes: Routes = [
  { path: '', component: ListarComponent }
];

@NgModule({
  imports: [RouterModule.forChild(tipoTarefaRoutes)],
  exports: [RouterModule]
})
export class TipoTarefaRoutingModule { }
