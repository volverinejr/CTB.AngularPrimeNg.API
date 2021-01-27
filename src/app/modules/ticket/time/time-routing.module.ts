import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarComponent } from './listar/listar.component';

const timeRoutes: Routes = [
  { path: '', component: ListarComponent }
];

@NgModule({
  imports: [RouterModule.forChild(timeRoutes)],
  exports: [RouterModule]
})
export class TimeRoutingModule { }
