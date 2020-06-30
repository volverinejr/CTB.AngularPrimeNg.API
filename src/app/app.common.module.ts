import { NgModule } from '@angular/core';
import { NgPrimeModule } from 'src/app/app.ngprime.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { YesNoPipe } from 'src/app/shared/pipe/yesNo.pipe';


@NgModule({
  declarations: [ YesNoPipe ],
  imports: [
  ],
  exports: [
    NgPrimeModule,
    FormsModule,
    ReactiveFormsModule,
    YesNoPipe
  ]
})
export class AppCommonModule { }
