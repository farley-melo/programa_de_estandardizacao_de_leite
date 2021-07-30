import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CadastroEstoqueMateriasPrimasComponent} from './cadastro-estoque-materias-primas/cadastro-estoque-materias-primas.component';
import {CadastroMateriasPrimasComponent} from './cadastro-materias-primas/cadastro-materias-primas.component';
import {CadastroFormulasComponent} from './cadastro-formulas/cadastro-formulas.component';
import {DepositoResolver} from './cadastro-estoque-materias-primas/deposito.resolver';
import {FormulaResolver} from './cadastro-formulas/formula.resolver';
import {MateriaPrimaResolver} from './cadastro-materias-primas/materia-prima.resolver';



const routes: Routes = [
  {path:'',component:CadastroEstoqueMateriasPrimasComponent,resolve:{listaDepositos:DepositoResolver}},
  {path:'cadastrar_materias_primas',component:CadastroMateriasPrimasComponent,resolve:{listaMateriasPrimas:MateriaPrimaResolver}},
  {path:'cadastrar_formulas',component:CadastroFormulasComponent,resolve:{listaFormulas:FormulaResolver}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastroRoutingModule { }
