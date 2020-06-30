import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AuthGuard } from './core/guards/auth.guard';


const routes: Routes = [
  {
    path: 'grupo',
    loadChildren: () => import('./modules/grupo/grupo.module').then(m => m.GrupoModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'natureza',
    loadChildren: () => import('./modules/natureza/natureza.module').then(m => m.NaturezaModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'taxaselic',
    loadChildren: () => import('./modules/taxaselic/taxaselic.module').then(m => m.TaxaSelicModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'infracao',
    loadChildren: () => import('./modules/infracao/infracao.module').then(m => m.InfracaoModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
