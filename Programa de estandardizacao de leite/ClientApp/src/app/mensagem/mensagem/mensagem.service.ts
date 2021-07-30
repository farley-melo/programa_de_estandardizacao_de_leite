import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Mensagem} from './mensagem';
import {take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MensagemService {
   private url:string='https://localhost:5001/api/Mensagem' +
     ''
  constructor(private http:HttpClient) { }

  public salvarOuAtualizarMensagem(mensagem:Mensagem){
      return this.http.post<Mensagem>(this.url,mensagem).pipe(take(1))
  }
  public buscarMensagem(){
     return this.http.get<Mensagem>(this.url).pipe(take(1))
  }
}
