import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Tl} from '../../lancar-tl/lancar-tl/tl';
import {count, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PesquisaService {
  url:string='https://localhost:5001/api/Tl'
  constructor(private http:HttpClient) { }
  public buscarTlPorData(data:string){
    return this.http.get<Tl[]>(`${this.url}/${data}`).pipe(take(1))
  }
  public buscarTlPorNotaFiscal(notaFiscal:string){
    return this.http.get<Tl>(`${this.url}/BuscarTlPorNotaFiscal/${notaFiscal}`).pipe(take(1))

  }
  public atualiazarTl(tl:Tl){
    return this.http.put<Tl>(this.url,tl).pipe(take(1))
  }

  public deletarTl(id:number){
    return this.http.delete<Tl>(`${this.url}/${id}`).pipe(take(1))
  }
  public buscarTlPeloId(id:number){
    return this.http.get(`${this.url}/BuscarTlPeloId/${id}`).pipe(take(1))
  }

  public buscarTodosTls(){
    return this.http.get<Tl[]>(`${this.url}`).pipe(take(1))
  }
}
