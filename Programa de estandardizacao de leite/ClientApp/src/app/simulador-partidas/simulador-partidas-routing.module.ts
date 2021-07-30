import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SimuladorPartidasComponent} from './simulador-partidas/simulador-partidas.component';
import {FormulaResolver} from '../cadastro/cadastro-formulas/formula.resolver';
import {DepositoResolver} from '../cadastro/cadastro-estoque-materias-primas/deposito.resolver';
import {DepositosUltilizadosResolver} from '../estoque/estoque/depositos-ultilizados.resolver';


const routes: Routes = [
  {path:'',component:SimuladorPartidasComponent,resolve:{formulas:FormulaResolver,depositosUltilizando:DepositosUltilizadosResolver}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SimuladorPartidasRoutingModule { }
