import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarComponent } from './listar/listar.component';

const solicitacaoAnaliseRoutes: Routes = [
  { path: '', component: ListarComponent }
];

@NgModule({
  imports: [RouterModule.forChild(solicitacaoAnaliseRoutes)],
  exports: [RouterModule]
})
export class SolicitacaoAnaliseRoutingModule { }
