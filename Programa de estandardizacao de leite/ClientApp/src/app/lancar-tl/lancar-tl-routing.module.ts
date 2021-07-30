import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LancarTlComponent} from './lancar-tl/lancar-tl.component';
import {DepositoResolver} from '../cadastro/cadastro-estoque-materias-primas/deposito.resolver';
import {MateriaPrimaResolver} from '../cadastro/cadastro-materias-primas/materia-prima.resolver';

const routes: Routes = [
  {path:'',component:LancarTlComponent,resolve:{listaDepositos:DepositoResolver,listaMateriasPrimas:MateriaPrimaResolver}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LancarTlRoutingModule { }
