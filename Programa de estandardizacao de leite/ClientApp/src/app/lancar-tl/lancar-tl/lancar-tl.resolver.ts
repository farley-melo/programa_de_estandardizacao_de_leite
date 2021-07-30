import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {LancarTlService} from './lancar-tl.service';
import {Tl} from './tl';

@Injectable({
  providedIn: 'root'
})
export class LancarTlResolver implements Resolve<Tl[]> {
  constructor(private tlService:LancarTlService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Tl[]> {
    return this.tlService.buscarTodosOsTls()
  }
}
