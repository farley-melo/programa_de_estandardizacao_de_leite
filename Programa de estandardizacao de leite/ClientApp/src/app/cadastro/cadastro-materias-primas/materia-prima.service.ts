import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MateriaPrima} from './materia-prima';
import {take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MateriaPrimaService {

  private url:string="https://localhost:5001/api/materiasPrimas"
  constructor(private http:HttpClient) { }

  public salvarMateriaPrima(materiaPrima:MateriaPrima){
    return this.http.post<MateriaPrima>(this.url,materiaPrima).pipe(take(1))
  }
  public buscarTodasMateriasPrimas(){
    return this.http.get<MateriaPrima[]>(this.url).pipe(take(1))
  }
  public deletarMateriaPrima(id:number){
    return this.http.delete(`${this.url}/${id}`).pipe(take(1))
  }


}
