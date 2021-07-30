import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login/login.component';

const routes: Routes = [
  {path:'cadastro-estoque-materias-primas',loadChildren:()=>import('./cadastro/cadastro.module').then(m=>m.CadastroModule)},
  {path:'estoque',loadChildren:()=>import('./estoque/estoque.module').then(m=>m.EstoqueModule)},
  {path:'calculos',loadChildren:()=>import('./calculos/calculos.module').then(m=>m.CalculosModule)},
  {path:'simulador',loadChildren:()=>import('./simulador-partidas/simulador-partidas.module').then(m=>m.SimuladorPartidasModule)},
  {path:'lancarTl',loadChildren:()=>import('./lancar-tl/lancar-tl.module').then(m=>m.LancarTlModule)},
  {path:'mensagem',loadChildren:()=>import('./mensagem/mensagem.module').then(m=>m.MensagemModule)},
  {path:'pesquisa',loadChildren:()=>import('./pesquisa/pesquisa.module').then(m=>m.PesquisaModule)},
  {path:'login',component:LoginComponent},
  {path:'',redirectTo:'login',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
