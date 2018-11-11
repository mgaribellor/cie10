import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LiquidacionCxComponent } from './liquidacion-cx/liquidacion-cx.component';

const routes: Routes = [
  {
    path: 'consultas',
    children: [
      { path: 'LiquidacionCx', component: LiquidacionCxComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ConsultasRoutingModule { }
