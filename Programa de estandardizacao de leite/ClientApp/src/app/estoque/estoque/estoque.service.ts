import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Tl} from '../../lancar-tl/lancar-tl/tl';
import {take} from 'rxjs/operators';
import {Estoque} from '../../cadastro/cadastro-estoque-materias-primas/estoque';
import {Analise} from '../../entidades/analise';

@Injectable({
  providedIn: 'root'
})
export class EstoqueService {
  url:string='https://localhost:5001/api/Tl'
  constructor(private http:HttpClient) { }

  public buscarTlPeloTanque(tanque:string){
    return this.http.get<Tl[]>(`${this.url}/BuscarTlsPeloTanque/${tanque}`).pipe(take(1))
  }
  public obterResumoMateriaPrimaDoTanque(){
    return this.http.get<any[]>(`${this.url}/ObterTodosResumosTl`).pipe(take(1))
  }

  public atualizarAnaliseDoDeposito(nomeDeposito:string,analise:Analise){
    return this.http.put(`https://localhost:5001/api/depositos/${nomeDeposito}`,analise).pipe(take(1))
  }

  public obterAnaliseDoDeposito(depositoNome:string){
    return this.http.get<Analise>(`https://localhost:5001/api/depositos/ObterAnaliseDoDeposito/${depositoNome}`).pipe(take(1))
  }
  public obterTanquesQueEstaoSendoUltilizados(){
    return this.http.get<any[]>('https://localhost:5001/api/depositos/ObterDepositosQueEstaoSendoUltilizados').pipe(take(1));
  }
}
