import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatButtonModule,
  MatProgressSpinnerModule,
  MatToolbarModule,
} from '@angular/material';
import { SvgIconComponent } from '@shared/components/svg-icon/svg-icon.component';



@NgModule({
  exports: [
    MatButtonModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    SvgIconComponent,
    FlexLayoutModule
  ],
  declarations: [SvgIconComponent]
})
export class SharedModule { }
