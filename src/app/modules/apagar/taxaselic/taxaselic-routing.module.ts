import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarComponent } from './listar/listar.component';

const taxaSelicRoutes: Routes = [
  { path: '', component: ListarComponent }
];

@NgModule({
  imports: [RouterModule.forChild(taxaSelicRoutes)],
  exports: [RouterModule]
})
export class TaxaSelicRoutingModule { }
