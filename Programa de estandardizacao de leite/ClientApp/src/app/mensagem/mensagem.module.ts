import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MensagemRoutingModule } from './mensagem-routing.module';
import { MensagemComponent } from './mensagem/mensagem.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [MensagemComponent],
  imports: [
    CommonModule,
    MensagemRoutingModule,FormsModule,ReactiveFormsModule,HttpClientModule
  ]
})
export class MensagemModule { }
