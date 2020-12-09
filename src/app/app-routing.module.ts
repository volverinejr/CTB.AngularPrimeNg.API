import { AgenteModel } from './shared/models/base/AgenteModel';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AuthGuard } from './core/guards/auth.guard';


const routes: Routes = [
  // BASE
  {
    path: 'insubsistencia',
    loadChildren: () => import('./modules/base/insubsistencia/insubsistencia.module').then(m => m.InsubsistenciaModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'entidadeautuadora',
    loadChildren: () => import('./modules/base/entidade-autuadora/entidade-autuadora.module').then(m => m.EntidadeAutuadoraModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'agente',
    loadChildren: () => import('./modules/base/agente/agente.module').then(m => m.AgenteModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },

  // INFRAÇÃO
  {
    path: 'grupo',
    loadChildren: () => import('./modules/infracao/grupo/grupo.module').then(m => m.GrupoModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'artigo',
    loadChildren: () => import('./modules/infracao/artigo/artigo.module').then(m => m.ArtigoModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'natureza',
    loadChildren: () => import('./modules/infracao/natureza/natureza.module').then(m => m.NaturezaModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'infracao',
    loadChildren: () => import('./modules/infracao/infracao/infracao.module').then(m => m.InfracaoModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
