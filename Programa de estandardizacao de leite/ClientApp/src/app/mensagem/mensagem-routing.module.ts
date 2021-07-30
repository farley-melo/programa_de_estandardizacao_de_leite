import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MensagemComponent} from './mensagem/mensagem.component';
import {MensagemResolver} from './mensagem/mensagem.resolver';

const routes: Routes = [
  {path:'',component:MensagemComponent,resolve:{mensagem:MensagemResolver}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MensagemRoutingModule { }
