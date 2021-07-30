import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstoqueRoutingModule } from './estoque-routing.module';
import { EstoqueComponent } from './estoque/estoque.component';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ProgressbarModule} from 'ngx-bootstrap/progressbar';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [EstoqueComponent],
    imports: [
        CommonModule,
        EstoqueRoutingModule,
        BsDropdownModule, FormsModule, ReactiveFormsModule, ProgressbarModule,HttpClientModule
    ]
})
export class EstoqueModule { }
