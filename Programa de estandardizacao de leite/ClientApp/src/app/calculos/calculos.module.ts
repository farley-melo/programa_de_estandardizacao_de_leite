import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalculosRoutingModule } from './calculos-routing.module';
import { CalculosComponent } from './calculos/calculos.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [CalculosComponent],
  imports: [
    CommonModule,
    CalculosRoutingModule,FormsModule,ReactiveFormsModule
  ]
})
export class CalculosModule { }
