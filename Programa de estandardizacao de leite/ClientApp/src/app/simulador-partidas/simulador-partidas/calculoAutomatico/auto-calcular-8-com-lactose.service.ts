import { Injectable } from '@angular/core';
import {AutoCalcularBase} from './auto-calcular-base';

@Injectable({
  providedIn: 'root'
})
export class AutoCalcular8ComLactoseService extends AutoCalcularBase{

  public autoCalcular8ComLactose(acucar:number,
                                esperadoGordura:number,
                                esperadoSnf:number,
                                rfMinimo:number,
                                rfMaximo:number,
                                fatorAcucarMinimo:number,
                                fatorAcucarMaximo:number,
                                tfEsperado:number,
                                gorduraLeiteIntegral:number,
                                snfLeiteIntegral:number,
                                gorduraPreIntegral: number,
                                snfPreIntegral: number,
                                gorduraPreDesnatado:number,
                                snfPreDesnatado:number,
                                gorduraButterOil:number,
                                snfButterOil:number,
                                snfLactose:number,
                                gorduraLactose:number) {
    this.resetarValores()
    this.correcoesIniciais(tfEsperado,snfLeiteIntegral,gorduraLeiteIntegral,acucar,esperadoSnf,snfPreIntegral,gorduraPreIntegral,snfLactose,gorduraLactose)
    let fatorAcucarRange = this.definirRange(fatorAcucarMinimo,fatorAcucarMaximo);
    let rfRange = this.definirRange(rfMinimo, rfMaximo);

    while (!(fatorAcucarRange.includes(this.fatorAcucarAtual) && rfRange.includes(this.rfAtual) && this.tfAtual == tfEsperado)) {
      this.quantidadeDeTentativas += 1;
      if (this.quantidadeDeTentativas > 100) {
        alert('nao foi possivel calcular tente ajustar manualmente ou acrescente outra materia prima');
        // this.resetarValores()
        break;
      }
      this.corrigirTf(tfEsperado,snfLeiteIntegral,gorduraLeiteIntegral,acucar)
      //loop auto ajuste
      //se o snf e a gordura estiverem abaixo do desejado aumentar  o pre integral ate o total de snf atingir o desejado de snf
      if (this.totalSnf < esperadoSnf && this.totalGordura < esperadoGordura) {
        while(this.totalSnf<esperadoSnf){
          this.acrescentarMateriaPrima('preIntegral',snfPreIntegral,gorduraPreIntegral,acucar)
        }
      }
      //se somente o  snf estiver abaixo do desejado aumentar o pre desnatado ate o snf atingir o desejado
      if (this.totalSnf < esperadoSnf) {
        while(this.totalSnf<esperadoSnf){
          this.acrescentarMateriaPrima('preDesnatado',snfPreDesnatado,gorduraPreDesnatado,acucar)
        }
      }
      //se somente a gordura estiver abaixo do desejado acrescentar butter oil ate a gordura atingir o desejado
      if (this.totalGordura < esperadoGordura) {
        while(this.totalGordura<esperadoGordura){
          this.acrescentarMateriaPrima('butterOil',snfButterOil,gorduraButterOil,acucar)
        }
      }
      ///////caso as materias primas estiverem altas

      //se a gordura estiver mais alta que o desejado e estiver usando butter oil retirar butter oil ate a gordura atingir o desejado
      if (this.totalGordura > esperadoGordura && this.quantidadeButterOil > 0) {
        while(this.totalGordura > esperadoGordura && this.quantidadeButterOil > 0){
          this.retirarMateriaPrima('butterOil',snfButterOil,gorduraButterOil,acucar)
        }
      }
      //se o snf estiver mais alto que o snf desejado e estiver usando pre desnatado retirar o pre desnatado ate o snf atingir o desejado
      if (this.totalSnf > esperadoSnf && this.quantidadePreDesnatado > 0) {
        while(this.totalSnf > esperadoSnf && this.quantidadePreDesnatado > 0){
          this.retirarMateriaPrima('preDesnatado',snfPreDesnatado,gorduraPreDesnatado,acucar)
        }
      }
      //se o a gordura e o snf estiverem altos retirar pre integral ate atingir o snf objetivo
      if (this.totalGordura > esperadoGordura && this.totalSnf > esperadoSnf) {
        while (this.totalSnf > esperadoSnf&&this.quantidadePreIntegral>=0){
          this.retirarMateriaPrima('preIntegral',snfPreIntegral,gorduraPreIntegral,acucar)
        }
      }
      //se o snf estiver alto e nao estiver usando pre desnatado retirar pre integral ate snf atingir o objetivo
      if (this.totalSnf > esperadoSnf && this.quantidadePreDesnatado == 0) {
        while (this.totalSnf > esperadoSnf&&this.quantidadePreDesnatado>=0){
          this.retirarMateriaPrima('preIntegral',snfPreIntegral,gorduraPreIntegral,acucar)
        }
      }
      if (this.totalGordura > esperadoGordura && this.quantidadeButterOil == 0) {

        while (this.totalGordura > esperadoGordura&&this.quantidadePreIntegral>=0){
          this.retirarMateriaPrima('preIntegral',snfPreIntegral,gorduraPreIntegral,acucar)
        }
      }
    }
    console.log('tfAtual:' + this.tfAtual);
    console.log('rfAtual' + this.rfAtual);
    console.log('fatorAcucarAtual:' + this.fatorAcucarAtual);
    console.log('quantidade de gordura total: '+this.totalGordura)
    console.log('quantidade leite:' + this.quantidadeLeiteIntegral);
    console.log('quantidade pre integral:' + this.quantidadePreIntegral);
    console.log('quantidade pre desnatado:' + this.quantidadePreDesnatado);
    console.log('quantidade butter oil:' + this.quantidadeButterOil);
    return{leite:this.quantidadeLeiteIntegral,preIntegral:this.quantidadePreIntegral,preDesnatado:this.quantidadePreDesnatado,butterOil:this.quantidadeButterOil,lactose:this.quantidadeLactose};
  }

  private correcoesIniciais(tfEsperado: number, snfLeite: number, gorduraLeite: number, acucar: number, esperadoSnf: number, snfPreIntegral: number, gorduraPreIntegral: number,snfLactose:number,gorduraLactose:number) {
    while (this.tfAtual > tfEsperado) {
      this.acrescentarMateriaPrima('leiteIntegral', snfLeite, gorduraLeite, acucar);
    }
    while(this.quantidadeLactose<125){
      this.acrescentarMateriaPrima('lactose',snfLactose,gorduraLactose,acucar)
    }
    while (this.totalSnf < esperadoSnf) {
      this.acrescentarMateriaPrima('preIntegral', snfPreIntegral, gorduraPreIntegral, acucar);
    }
  }
  private corrigirTf(tfEsperado: number, snfLeite: number, gorduraLeite: number, acucar: number) {
    while (this.tfAtual > tfEsperado) {
      this.acrescentarMateriaPrima('leiteIntegral', snfLeite, gorduraLeite, acucar);
    }
    while (this.tfAtual < tfEsperado && this.quantidadeLeiteIntegral >= 0) {
      this.retirarMateriaPrima('leiteIntegral', snfLeite, gorduraLeite, acucar);
    }
  }

}
