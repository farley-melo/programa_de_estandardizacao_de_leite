import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PesquisaRoutingModule } from './pesquisa-routing.module';
import { PesquisaComponent } from './pesquisa/pesquisa.component';
import {NgxMaskModule} from 'ngx-mask';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {LancarTlModule} from '../lancar-tl/lancar-tl.module';



@NgModule({
  declarations: [PesquisaComponent],
  exports: [
    PesquisaComponent
  ],
  imports: [
    CommonModule,
    PesquisaRoutingModule,
    NgxMaskModule,
    BsDatepickerModule,
    PaginationModule,
    ReactiveFormsModule,
    HttpClientModule,
    LancarTlModule,

  ]
})
export class PesquisaModule { }
