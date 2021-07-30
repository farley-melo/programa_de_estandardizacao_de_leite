import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {DepositosService} from '../../cadastro/cadastro-estoque-materias-primas/depositos.service';
import {EstoqueService} from './estoque.service';

@Injectable({
  providedIn: 'root'
})
export class DepositosUltilizadosResolver implements Resolve<any[]> {
  constructor(private estoqueService:EstoqueService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> {
    return this.estoqueService.obterTanquesQueEstaoSendoUltilizados();
  }
}
