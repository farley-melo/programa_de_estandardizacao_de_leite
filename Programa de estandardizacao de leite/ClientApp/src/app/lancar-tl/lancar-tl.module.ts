import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LancarTlRoutingModule } from './lancar-tl-routing.module';
import { LancarTlComponent } from './lancar-tl/lancar-tl.component';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
    declarations: [LancarTlComponent],
    exports: [
        LancarTlComponent
    ],
  imports: [
    CommonModule,
    LancarTlRoutingModule,
    BsDatepickerModule,
    ReactiveFormsModule,


  ]
})
export class LancarTlModule { }
