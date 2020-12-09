import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api/menuitem';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'CTB';

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
    ];
  }



  clicked(rota: string) {
    this.router.navigate([rota]);
  }


}
