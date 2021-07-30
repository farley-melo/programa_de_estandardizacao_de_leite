import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {FormulaService} from './formula.service';
import {Formula} from './formula';

@Injectable({
  providedIn: 'root'
})
export class FormulaResolver implements Resolve<Formula[]> {
  constructor(private formulaService:FormulaService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Formula[]> {
    return this.formulaService.buscarTodasFormulas();
  }
}
