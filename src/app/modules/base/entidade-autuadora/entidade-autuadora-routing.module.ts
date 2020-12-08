import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarComponent } from './listar/listar.component';

const entidadesRoutes: Routes = [
  { path: '', component: ListarComponent }
];

@NgModule({
  imports: [RouterModule.forChild(entidadesRoutes)],
  exports: [RouterModule]
})
export class EntidadeAutuadoraRoutingModule { }
