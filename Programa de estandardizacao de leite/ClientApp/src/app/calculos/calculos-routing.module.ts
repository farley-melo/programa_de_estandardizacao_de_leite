import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CalculosComponent} from './calculos/calculos.component';

const routes: Routes = [
  {path:'',component:CalculosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalculosRoutingModule { }
