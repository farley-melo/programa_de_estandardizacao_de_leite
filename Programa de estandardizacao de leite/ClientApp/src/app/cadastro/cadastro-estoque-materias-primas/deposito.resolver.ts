import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {DepositosService} from './depositos.service';
import {Estoque} from './estoque';

@Injectable({
  providedIn: 'root'
})
export class DepositoResolver implements Resolve<Estoque[]> {
  constructor(private depositoService:DepositosService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Estoque[]> {
    return this.depositoService.buscarTodosDepositos();
  }
}
