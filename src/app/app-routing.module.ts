import { AgenteModel } from './shared/models/base/AgenteModel';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AuthGuard } from './core/guards/auth.guard';


const routes: Routes = [
  // TICKET
  {
    path: 'sistema',
    loadChildren: () => import('./modules/ticket/sistema/sistema.module').then(m => m.SistemaModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'pessoa',
    loadChildren: () => import('./modules/ticket/pessoa/pessoa.module').then(m => m.PessoaModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'tipotarefa',
    loadChildren: () => import('./modules/ticket/tipotarefa/tipo-tarefa.module').then(m => m.TipoTarefaModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'cliente',
    loadChildren: () => import('./modules/ticket/cliente/cliente.module').then(m => m.ClienteModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'sprint',
    loadChildren: () => import('./modules/ticket/sprint/sprint.module').then(m => m.SprintModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'time',
    loadChildren: () => import('./modules/ticket/time/time.module').then(m => m.TimeModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'solicitacao',
    loadChildren: () => import('./modules/ticket/solicitacao/solicitacao.module').then(m => m.SolicitacaoModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'solicitacaoanalise',
    loadChildren: () => import('./modules/ticket/solicitacaoanalise/solicitacaoanalise.module').then(m => m.SolicitacaoAnaliseModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },


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
