import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultasRoutingModule } from './consultas-routing.module';
import { LiquidacionCxComponent } from './liquidacion-cx/liquidacion-cx.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';

@NgModule({
  imports: [
    CommonModule,
    ConsultasRoutingModule,
    FormsModule,
    MDBBootstrapModule.forRoot(),
    MaterialModule
  ],
  declarations: [LiquidacionCxComponent]
})
export class ConsultasModule { }
