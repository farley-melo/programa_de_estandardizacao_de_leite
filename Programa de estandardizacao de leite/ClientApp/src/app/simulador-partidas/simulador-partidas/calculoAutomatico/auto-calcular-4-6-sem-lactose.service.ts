import { Injectable } from '@angular/core';
import {AutoCalcularBase} from './auto-calcular-base';

@Injectable({
  providedIn: 'root'
})
export class AutoCalcular46SemLactoseService extends AutoCalcularBase{

  public autoCalcularSemLactose(acucar: number,
                                esperadoGordura: number,
                                esperadoSnf: number,
                                tfEsperado: number,
                                fatorAcucarMinimo: number,
                                fatorAcucarMaximo: number,
                                rfMinimo: number,
                                rfMaximo: number,
                                gorduraPreDesnatado: number,
                                snfPreDesnatado: number,
                                gorduraLeite: number,
                                snfLeite: number,
                                gorduraPreIntegral:number,
                                snfPreIntegral:number
                                 ){
    this.resetarValores()
    let fatorAcucarRange = this.definirRange(fatorAcucarMinimo, fatorAcucarMaximo);
    let rfRange = this.definirRange(rfMinimo, rfMaximo);
    this.correcoesIniciais(tfEsperado,snfLeite,gorduraLeite,acucar,esperadoSnf,snfPreDesnatado,gorduraPreDesnatado)
    while (!(fatorAcucarRange.includes(this.fatorAcucarAtual) && rfRange.includes(this.rfAtual) && this.tfAtual == tfEsperado)) {
      this.quantidadeDeTentativas += 1;
      if (this.quantidadeDeTentativas > 100) {
        alert('nao foi possivel calcular tente ajustar manualmente ou acrescente outra materia prima');
       // this.resetarValores()
        break;
      }
      this.corrigirTf(tfEsperado, snfLeite, gorduraLeite, acucar);
      this.corrigirSnf(esperadoSnf, snfPreDesnatado, gorduraPreDesnatado, acucar);
      this.corrigirGordura(esperadoGordura,snfPreIntegral,gorduraPreIntegral,acucar);

    }
    console.log('tfAtual:' + this.tfAtual);
    console.log('rfAtual' + this.rfAtual);
    console.log('fatorAcucarAtual:' + this.fatorAcucarAtual);
    console.log('quantidade de gordura total: '+this.totalGordura)
    console.log('quantidade leite:' + this.quantidadeLeiteIntegral);
    console.log('quantidade pre integral:' + this.quantidadePreIntegral);
    console.log('quantidade pre desnatado:' + this.quantidadePreDesnatado);
    console.log('quantidade butter oil:' + this.quantidadeButterOil);
    return {quantidadeLeite:this.quantidadeLeiteIntegral,quantidadePreDesnatado:this.quantidadePreDesnatado,quantidadePreIntegral:this.quantidadePreIntegral,quantidadeButterOil:this.quantidadeButterOil}

  }

  private correcoesIniciais(tfEsperado: number, snfLeite: number, gorduraLeite: number, acucar: number, esperadoSnf: number, snfPreDesnatado: number, gorduraPreDesnatado: number) {
    while (this.tfAtual > tfEsperado) {
      this.acrescentarMateriaPrima('leiteIntegral', snfLeite, gorduraLeite, acucar);
    }
    while (this.totalSnf < esperadoSnf) {
      this.acrescentarMateriaPrima('preDesnatado', snfPreDesnatado, gorduraPreDesnatado, acucar);
    }
  }

  private corrigirTf(tfEsperado: number, snfLeite: number, gorduraLeite: number, acucar: number) {
    while (this.tfAtual > tfEsperado) {
      this.acrescentarMateriaPrima('leiteIntegral', snfLeite, gorduraLeite, acucar);
    }
    while (this.tfAtual < tfEsperado && this.quantidadeLeiteIntegral > 0) {
      this.retirarMateriaPrima('leiteIntegral', snfLeite, gorduraLeite, acucar);
    }
  }

  private corrigirSnf(esperadoSnf: number, snfPreDesnatado: number, gorduraPreDesnatado: number, acucar: number) {
    while (this.totalSnf < esperadoSnf) {
      this.acrescentarMateriaPrima('preDesnatado', snfPreDesnatado, gorduraPreDesnatado, acucar);
    }
    while (this.totalSnf > esperadoSnf && this.quantidadePreDesnatado > 0) {
      this.retirarMateriaPrima('preDesnatado', snfPreDesnatado, gorduraPreDesnatado, acucar);
    }
  }

  private corrigirGordura(esperadoGordura: number, snfPreIntegral: number, gorduraPreIntegral: number, acucar: number) {
    while (this.totalGordura < esperadoGordura) {
      this.acrescentarMateriaPrima('preIntegral', snfPreIntegral, gorduraPreIntegral, acucar);
    }
    while (this.totalGordura > esperadoGordura && this.quantidadePreIntegral > 0) {
      this.retirarMateriaPrima('preIntegral', snfPreIntegral, gorduraPreIntegral, acucar);
    }

  }
}
