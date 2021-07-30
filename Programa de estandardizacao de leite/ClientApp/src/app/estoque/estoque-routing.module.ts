import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EstoqueComponent} from './estoque/estoque.component';
import {DepositoResolver} from '../cadastro/cadastro-estoque-materias-primas/deposito.resolver';
import {EstoqueResolver} from './estoque/estoque.resolver';

const routes: Routes = [
  {path:'',component:EstoqueComponent,resolve:{listaDepositos:DepositoResolver,resumoTl:EstoqueResolver}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstoqueRoutingModule { }
