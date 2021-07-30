import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Estoque} from './estoque';
import {take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DepositosService {

  private url:string="https://localhost:5001/api/depositos"
  constructor(private http:HttpClient) { }

  public salvarDeposito(estoque:Estoque){
    return this.http.post<Estoque>(this.url,estoque).pipe(take(1))
  }
  public buscarTodosDepositos(){
    return this.http.get<Estoque[]>(this.url).pipe(take(1))
  }
  public deletarDeposito(nome:string){
    return this.http.delete(`${this.url}/${nome}`).pipe(take(1))
  }


}
