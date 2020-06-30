import { NgModule } from '@angular/core';

import { ToolbarModule } from 'primeng/toolbar';
import { SidebarModule } from 'primeng/sidebar';
import { MenuModule } from 'primeng/menu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { PaginatorModule } from 'primeng/paginator';
import { ConfirmationService } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';
import { DropdownModule } from 'primeng/dropdown';
import { ListboxModule } from 'primeng/listbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MenubarModule } from 'primeng/menubar';
import { CardModule } from 'primeng/card';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputMaskModule } from 'primeng/inputmask';
import { KeyFilterModule } from 'primeng/keyfilter';
import { SpinnerModule } from 'primeng/spinner';
import { CalendarModule } from 'primeng/calendar';

import { CurrencyMaskModule } from 'ng2-currency-mask';


@NgModule({
  exports: [
    ToolbarModule,
    SidebarModule,
    MenuModule,
    PanelMenuModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    ScrollPanelModule,
    DialogModule,
    CheckboxModule,
    MessagesModule,
    MessageModule,
    ConfirmDialogModule,
    ToastModule,
    TieredMenuModule,
    PaginatorModule,
    TooltipModule,
    DropdownModule,
    ListboxModule,
    RadioButtonModule,
    MenubarModule,
    CardModule,
    InputTextareaModule,
    InputMaskModule,
    KeyFilterModule,
    SpinnerModule,
    CurrencyMaskModule,
    CalendarModule,
  ],
  providers: [ConfirmationService],
})
export class NgPrimeModule { }
