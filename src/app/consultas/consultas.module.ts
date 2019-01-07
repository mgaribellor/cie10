import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultasRoutingModule } from './consultas-routing.module';
import { LiquidacionCxComponent } from './liquidacion-cx/liquidacion-cx.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { LiquidacionCIEComponent, DialogContentCIE } from './liquidacion-cie/liquidacion-cie.component';


@NgModule({
  imports: [    
    CommonModule,
    ConsultasRoutingModule,
    FormsModule,
    MDBBootstrapModule.forRoot(),
    MaterialModule    
  ],
  entryComponents: [
    DialogContentCIE
  ],
  declarations: [LiquidacionCxComponent, LiquidacionCIEComponent,DialogContentCIE]
})
export class ConsultasModule { }
