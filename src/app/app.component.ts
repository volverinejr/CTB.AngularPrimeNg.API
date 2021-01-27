import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api/menuitem';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Ticktes';

  items: MenuItem[];

  constructor(
    private router: Router
  ) {
  }


  ngOnInit() {
    this.items = [
      {
        icon: 'pi pi-home', command: () => { this.clicked(''); }
      },

      {
        label: 'Cadastro Base',
        items: [
          { label: 'Sistema', icon: 'pi pi-th-large', command: () => { this.clicked('sistema'); } },
          { label: 'Tipo de Tarefa', icon: 'pi pi-map-marker', command: () => { this.clicked('tipotarefa'); } },
          { label: 'Time', icon: 'pi pi-fw pi-users', command: () => { this.clicked('time'); } },
          { label: 'Cliente', icon: 'pi pi-fw pi-users', command: () => { this.clicked('cliente'); } },
          {
            separator: true
          },
          { label: 'Pessoa', icon: 'pi pi-fw pi-users', command: () => { this.clicked('pessoa'); } },
        ]
      },

      {
        label: 'Ticket',
        items: [
          { label: 'Solicitação', icon: 'pi pi-fw pi-users', command: () => { this.clicked('solicitacao'); } },
          {
            separator: true
          },
          { label: 'Análise', icon: 'pi pi-fw pi-users', command: () => { this.clicked('solicitacaoanalise'); } },
          {
            separator: true
          },
          { label: 'Sprints', icon: 'pi pi-fw pi-users', command: () => { this.clicked('sprint'); } },
        ]
      },


      /*
            {
              label: 'Base',
              items: [
                { label: 'Insubsistência', icon: 'pi pi-th-large', command: () => { this.clicked('insubsistencia'); } },
                { label: 'Ent. Autuadora', icon: 'pi pi-map-marker', command: () => { this.clicked('entidadeautuadora'); } },
                { label: 'Agente', icon: 'pi pi-fw pi-users', command: () => { this.clicked('agente'); } },
              ]
            },

            {
              label: 'Infração',
              items: [
                { label: 'Grupo', icon: 'pi pi-tags', command: () => { this.clicked('grupo'); } },
                { label: 'Artigo', icon: 'pi pi-ticket', command: () => { this.clicked('artigo'); } },
                { label: 'Natureza', icon: 'pi pi-tablet', command: () => { this.clicked('natureza'); } },
                { label: 'Infração', icon: 'pi pi-star', command: () => { this.clicked('infracao'); } },
              ]
            },

            {
              label: 'Veículo',
              items: [
                { label: 'Grupo', icon: 'pi pi-th-large', command: () => { this.clicked('grupo'); } },
                { label: 'Insubsistência', icon: 'pi pi-th-large', command: () => { this.clicked('insubsistencia'); } },
                { label: 'Natureza', icon: 'pi pi-fw pi-users', command: () => { this.clicked('natureza'); } },
                { label: 'Taxa Selic', icon: 'pi pi-list', command: () => { this.clicked('taxaselic'); } },
                { label: 'Infração', icon: 'pi pi-user-plus', command: () => { this.clicked('infracao'); } },
              ]
            }
      */

    ];
  }



  clicked(rota: string) {
    this.router.navigate([rota]);
  }


}
