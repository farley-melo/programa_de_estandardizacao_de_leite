import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {EstoqueService} from './estoque.service';


@Injectable({
  providedIn: 'root'
})
export class EstoqueResolver implements Resolve<any[]> {
  constructor(private estoqueService:EstoqueService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> {
    return this.estoqueService.obterResumoMateriaPrimaDoTanque();
  }
}
