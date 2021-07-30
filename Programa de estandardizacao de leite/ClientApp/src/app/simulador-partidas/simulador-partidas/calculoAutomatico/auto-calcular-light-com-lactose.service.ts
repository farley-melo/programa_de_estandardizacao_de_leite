import {Injectable} from '@angular/core';
import {AutoCalcularBase} from './auto-calcular-base';

@Injectable({
  providedIn: 'root'
})
export class AutoCalcularLightComLactoseService extends AutoCalcularBase{

  public autoCalcularLightComLactose(acucar: number,
                                     esperadoGordura: number,
                                     esperadoSnf: number,
                                     tfEsperado: number,
                                     fatorAcucarMinimo: number,
                                     fatorAcucarMaximo: number,
                                     rfMinimo: number,
                                     rfMaximo: number,
                                     gorduraPreDesnatado: number,
                                     snfPreDesnatado: number,
                                     gorduraAgua: number,
                                     snfAgua: number,
                                     gorduraButterOil: number,
                                     snfButterOil: number,
                                     gorduraLactose:number,
                                     snfLactose:number) {
    this.resetarValores()
    let fatorAcucarRange = this.definirRange(fatorAcucarMinimo, fatorAcucarMaximo);
    let rfRange = this.definirRange(rfMinimo, rfMaximo);
    this.correcoesIniciais(tfEsperado, snfAgua, gorduraAgua, acucar, esperadoSnf, snfPreDesnatado, gorduraPreDesnatado,snfLactose,gorduraLactose);

    while (!(fatorAcucarRange.includes(this.fatorAcucarAtual) && rfRange.includes(this.rfAtual) && this.tfAtual == tfEsperado)) {
      this.quantidadeDeTentativas += 1;
      if (this.quantidadeDeTentativas > 100) {
        alert('nao foi possivel calcular tente ajustar manualmente ou acrescente outra materia prima');
        this.resetarValores()
        break;
      }
      this.corrigirTf(tfEsperado, snfAgua, gorduraAgua, acucar);
      this.corrigirSnf(esperadoSnf, snfPreDesnatado, gorduraPreDesnatado, acucar);
      this.corrigirGordura(esperadoGordura,snfButterOil,gorduraButterOil,acucar);
    }

    console.log('tfAtual:' + this.tfAtual);
    console.log('rfAtual' + this.rfAtual);
    console.log('quantidade de gordura total'+this.totalGordura)
    console.log('fatorAcucarAtual:' + this.fatorAcucarAtual);
    console.log('quantidade agua:' + this.quantidadeAgua);
    console.log('quantidade desnatado:' + this.quantidadePreDesnatado);
    console.log('quantidade butter oil:' + this.quantidadeButterOil);
    return {quantidadeAgua:this.quantidadeAgua,quantidadePreDesnatado:this.quantidadePreDesnatado,quantidadeButterOil:this.quantidadeButterOil,quantidadeLactose:this.quantidadeLactose}
  }

  private correcoesIniciais(tfEsperado: number, snfAgua: number, gorduraAgua: number, acucar: number, esperadoSnf: number, snfPreDesnatado: number, gorduraPreDesnatado: number,snfLactose:number,gorduraLactose:number) {
    while (this.tfAtual > tfEsperado) {
      this.acrescentarMateriaPrima('agua', snfAgua, gorduraAgua, acucar);
    }
    while(this.quantidadeLactose<125){
      this.acrescentarMateriaPrima('lactose',snfLactose,gorduraLactose,acucar)
    }
    while (this.totalSnf < esperadoSnf) {
      this.acrescentarMateriaPrima('preDesnatado', snfPreDesnatado, gorduraPreDesnatado, acucar);
    }
  }

  private corrigirGordura(esperadoGordura: number, snfButterOil: number, gorduraButterOil: number, acucar: number) {
    while (this.totalGordura < esperadoGordura) {
      this.acrescentarMateriaPrima('butterOil', snfButterOil, gorduraButterOil, acucar);
    }
    while (this.totalGordura > esperadoGordura && this.quantidadeButterOil > 0) {
      this.retirarMateriaPrima('butterOil', snfButterOil, gorduraButterOil, acucar);
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

  private corrigirTf(tfEsperado: number, snfAgua: number, gorduraAgua: number, acucar: number) {
    while (this.tfAtual > tfEsperado) {
      this.acrescentarMateriaPrima('agua', snfAgua, gorduraAgua, acucar);
    }
    while (this.tfAtual < tfEsperado && this.quantidadeAgua > 0) {
      this.retirarMateriaPrima('agua', snfAgua, gorduraAgua, acucar);
    }
  }



}
