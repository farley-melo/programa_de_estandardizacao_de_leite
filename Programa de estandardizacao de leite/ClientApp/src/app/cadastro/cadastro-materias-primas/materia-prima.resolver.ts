import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {MateriaPrimaService} from './materia-prima.service';
import {MateriaPrima} from './materia-prima';

@Injectable({
  providedIn: 'root'
})
export class MateriaPrimaResolver implements Resolve<MateriaPrima[]> {
  constructor(private materiaPrimaService:MateriaPrimaService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MateriaPrima[]> {
    return this.materiaPrimaService.buscarTodasMateriasPrimas();
  }
}
