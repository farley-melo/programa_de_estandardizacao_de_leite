import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Estoque} from '../cadastro-estoque-materias-primas/estoque';
import {take} from 'rxjs/operators';
import {Formula} from './formula';

@Injectable({
  providedIn: 'root'
})
export class FormulaService {

  private url:string="https://localhost:5001/api/formulas"
  constructor(private http:HttpClient) { }

  public salvarFormula(formula:Formula){
    return this.http.post<Formula>(this.url,formula).pipe(take(1))
  }
  public buscarTodasFormulas(){
    return this.http.get<Formula[]>(this.url).pipe(take(1))
  }
  public deletarFormula(gordura:number){
    return this.http.delete(`${this.url}/${gordura}`).pipe(take(1))
  }



}
