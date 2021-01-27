import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarComponent } from './listar/listar.component';

const solicitacaoRoutes: Routes = [
  { path: '', component: ListarComponent }
];

@NgModule({
  imports: [RouterModule.forChild(solicitacaoRoutes)],
  exports: [RouterModule]
})
export class SolicitacaoRoutingModule { }
