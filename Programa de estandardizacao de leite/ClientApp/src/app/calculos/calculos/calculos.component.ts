import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-calculos',
  templateUrl: './calculos.component.html',
  styleUrls: ['./calculos.component.css']
})
export class CalculosComponent implements OnInit {

  leiteIntegralForm:FormGroup;
  preCondensadoForm:FormGroup;
  cremeForm:FormGroup;
  acidezPreForm:FormGroup;
  public leiteIntegralAtivo:boolean
  public preCondensadoAtivo:boolean
  public cremeAtivo:boolean
  public acidezAtivo:boolean
  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.leiteIntegralForm=this.formBuilder.group({
      gorduraLeite:[],
      densidadeLeite:[],
      snfLeite:[],
      tcLeite:[]
    })

    this.preCondensadoForm=this.formBuilder.group({
      gorduraPre:[],
      densidadePre:[],
      snfPre:[],
      tcPre:[],
      gorduraCalculadaPre:[],
      densidadeCalculadaPre:[]
    })
    this.cremeForm=this.formBuilder.group({
      gorduraCreme:[],
      densidadeCreme:[],
      snfCreme:[],
      tcCreme:[],
      gorduraCalculadaCreme:[]
    })
    this.acidezPreForm=this.formBuilder.group({
      volumeTituladoPre:[],
      fatorCorrecaoPre:[1.002],
      tcPre:[],
      acidezPreResult:[]
    })
    this.leiteIntegralAtivo=true;
  }
  get gorduraLeite(){
    return this.leiteIntegralForm.get('gorduraLeite')
  }
  get densidadeLeite(){
    return this.leiteIntegralForm.get('densidadeLeite')
  }
  get snfLeite(){
    return this.leiteIntegralForm.get('snfLeite')
  }
  get tcLeite(){
    return this.leiteIntegralForm.get('tcLeite')
  }
  get gorduraPre(){
    return this.preCondensadoForm.get('gorduraPre')
  }
  get densidadePre(){
    return this.preCondensadoForm.get('densidadePre')
  }
  get snfPre(){
    return this.preCondensadoForm.get('snfPre')
  }
  get tcPre(){
    return this.preCondensadoForm.get('tcPre')
  }
  get gorduraCreme(){
    return this.cremeForm.get('gorduraCreme')
  }
  get densidadeCreme(){
    return this.cremeForm.get('densidadeCreme')
  }
  get snfCreme(){
    return this.cremeForm.get('snfCreme')
  }
  get tcCreme(){
    return this.cremeForm.get('tcCreme')
  }
  get gorduraCalculadaCreme(){
    return this.cremeForm.get('gorduraCalculadaCreme')
  }






  get gorduraCalculadaPre(){
    return this.preCondensadoForm.get('gorduraCalculadaPre')
  }
  get densidadeCalculadaPre(){
    return this.preCondensadoForm.get('densidadeCalculadaPre')
  }

  calcularSnfLeiteIntegral():number{
    const fatorDensidade=0.25
    const fatorGordura=0.20
    const fatorCorrecao=0.63
    let gordura=this.gorduraLeite?.value
    let densidade=(this.densidadeLeite?.value-1)*1000
    let snf=(fatorDensidade*densidade)+(fatorGordura*gordura)+fatorCorrecao
    return snf;

  }
  mostrarSnf(){
    this.snfLeite?.setValue(this.calcularSnfLeiteIntegral().toFixed(2))
  }
  calcularTcLeiteIntegral():number{
    let gordura=parseFloat(this.gorduraLeite?.value)
    let snf=this.calcularSnfLeiteIntegral()
    let tc=gordura+snf
    return tc;
  }

  mostrarResultadoLeiteIntegral() {
    if(this.gorduraLeite?.value!=null&&this.gorduraLeite.value!=''&&this.densidadeLeite?.value!=null&&this.densidadeLeite.value!=''){
      this.mostrarSnf()
      let result=this.calcularTcLeiteIntegral()
      this.tcLeite?.setValue(result.toFixed(2))
    }

  }

  mostrarFormularioLeiteIntegral() {
    this.leiteIntegralAtivo=true;
    this.preCondensadoAtivo=false
    this.cremeAtivo=false
    this.acidezAtivo=false

  }

  mostrarFormularioPreCondensado() {
    this.leiteIntegralAtivo=false
    this.cremeAtivo=false
    this.acidezAtivo=false
    this.preCondensadoAtivo=true

  }

  calcularTcPrecondensado(){
    let gorduraPreCondensado=this.gorduraPre?.value
    let densidadePreCondensado=(this.densidadePre?.value-1)*1000
    let tc=(0.875*densidadePreCondensado)+(4.2*gorduraPreCondensado)+1.8
    return tc
  }
  mostrarResultadosPreCondensado(){
    if(this.gorduraPre!=null&&this.gorduraPre.value!=null&&this.densidadePre?.value!=null&&this.densidadePre.value!=''){
      this.tcPre?.setValue(this.calcularTcPrecondensado().toFixed(2))
      this.gorduraCalculadaPre?.setValue(this.calcularGorduraPreCondensado().toFixed(2))
      this.snfPre?.setValue(this.calcularSnfPreCondensado().toFixed(2))
      this.densidadeCalculadaPre?.setValue(this.calcularDensidadePreCondensado().toFixed(4))
    }

  }
  calcularGorduraPreCondensado(){
    let gorduraPreCondensado=this.gorduraPre?.value
    let gorduraCalculada=(3.3*gorduraPreCondensado)
    return gorduraCalculada
  }
  calcularSnfPreCondensado(){
    let snfCalculado=this.calcularTcPrecondensado()-this.calcularGorduraPreCondensado()
    return snfCalculado
  }
  calcularDensidadePreCondensado(){
    let densidadePreCondensadoCalculada= (((this.densidadePre?.value-1)*1000)*3.5)/1000+1
    return densidadePreCondensadoCalculada
  }

  mostrarFormularioCreme() {
    this.preCondensadoAtivo=false
    this.leiteIntegralAtivo=false
    this.acidezAtivo=false
    this.cremeAtivo=true

  }

  mostrarResultadosCreme() {
    if(this.densidadeCreme?.value!=null&&this.densidadeCreme.value!=''&&this.gorduraCreme?.value!=null&&this.gorduraCreme.value!=''){
      let gorduraCalculadaCreme=this.gorduraCreme.value*10
      this.gorduraCalculadaCreme?.setValue(gorduraCalculadaCreme.toFixed(2))
      let snf=(100-gorduraCalculadaCreme)*9.1/100
      this.snfCreme?.setValue(snf.toFixed(2))
      let tc=snf+gorduraCalculadaCreme
      this.tcCreme?.setValue(tc.toFixed(2))
    }

  }

  mostrarResultadoAcidezPre() {
    let voluemTituladoPre=parseFloat(this.acidezPreForm.get('volumeTituladoPre')?.value)
    let fatorCorrecao=parseFloat(this.acidezPreForm.get('fatorCorrecaoPre')?.value)
    let tcPre=parseFloat(this.acidezPreForm.get('tcPre')?.value)
    let result=voluemTituladoPre*10000*fatorCorrecao/(tcPre*20)
    this.acidezPreForm.get('acidezPreResult')?.setValue(result.toFixed(2))

  }

  mostrarFormularioAcidezPre() {
    this.preCondensadoAtivo=false
    this.leiteIntegralAtivo=false
    this.cremeAtivo=false
    this.acidezAtivo=true

  }

}
