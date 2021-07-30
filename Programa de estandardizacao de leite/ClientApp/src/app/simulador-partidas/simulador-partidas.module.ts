import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SimuladorPartidasRoutingModule } from './simulador-partidas-routing.module';
import { SimuladorPartidasComponent } from './simulador-partidas/simulador-partidas.component';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {CollapseModule} from 'ngx-bootstrap/collapse';
import {ReactiveFormsModule} from '@angular/forms';
import {CurrencyMaskConfig, CurrencyMaskInputMode, NgxCurrencyModule} from 'ngx-currency';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {NgxPrintModule} from 'ngx-print';
import {NgxMaskModule} from 'ngx-mask';
export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  nullable: false,
  align: "right",
  allowNegative: true,
  allowZero: true,
  decimal: ",",
  precision: 2,
  prefix: "kG ",
  suffix: "",
  thousands: "."
};


@NgModule({
  declarations: [SimuladorPartidasComponent],
    imports: [
        CommonModule,
        SimuladorPartidasRoutingModule,
        BsDropdownModule.forRoot(),
        CollapseModule.forRoot(),
        ReactiveFormsModule,
        NgxCurrencyModule.forRoot(CustomCurrencyMaskConfig),
        BsDatepickerModule,
        NgxPrintModule,
        NgxMaskModule
    ]
})
export class SimuladorPartidasModule { }
