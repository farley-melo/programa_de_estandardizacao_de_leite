import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CadastroRoutingModule } from './cadastro-routing.module';
import { CadastroEstoqueMateriasPrimasComponent } from './cadastro-estoque-materias-primas/cadastro-estoque-materias-primas.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CadastroMateriasPrimasComponent } from './cadastro-materias-primas/cadastro-materias-primas.component';
import { CadastroFormulasComponent } from './cadastro-formulas/cadastro-formulas.component';
import {HttpClientModule} from '@angular/common/http';
import {OrderModule} from 'ngx-order-pipe';


@NgModule({
  declarations: [CadastroEstoqueMateriasPrimasComponent, CadastroMateriasPrimasComponent, CadastroFormulasComponent],
    imports: [
        CommonModule,
        CadastroRoutingModule, FormsModule, ReactiveFormsModule, OrderModule
    ]
})
export class CadastroModule { }
