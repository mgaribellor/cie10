import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LiquidacionCxComponent } from './liquidacion-cx/liquidacion-cx.component';
import { LiquidacionCIEComponent } from './liquidacion-cie/liquidacion-cie.component';

const routes: Routes = [
  {
    path: '', component: LiquidacionCIEComponent,
   
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ConsultasRoutingModule { }
