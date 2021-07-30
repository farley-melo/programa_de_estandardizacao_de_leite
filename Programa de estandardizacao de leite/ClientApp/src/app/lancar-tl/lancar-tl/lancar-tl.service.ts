import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Tl} from './tl';
import {take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LancarTlService {
  url:string='https://localhost:5001/api/Tl'
  constructor(private http:HttpClient) { }

  public salvarTl(tl:Tl){
    return this.http.post(this.url,tl).pipe(take(1))
  }
  public buscarTodosOsTls(){
    return this.http.get<Tl[]>(this.url).pipe(take(1))
  }

  public buscarResumoTlPeloNomeDoTanque(nomeTanque:string){
    return this.http.get<any[]>(`${this.url}/ObterResumoTlPeloNomeDoTanque/${nomeTanque}`).pipe(take(1))
  }




}
