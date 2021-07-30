import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {Mensagem} from './mensagem';
import {MensagemService} from './mensagem.service';

@Injectable({
  providedIn: 'root'
})
export class MensagemResolver implements Resolve<Mensagem> {
  constructor(private mensagemService:MensagemService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Mensagem> {
    return this.mensagemService.buscarMensagem();
  }
}
