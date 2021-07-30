export class AutoCalcularBase {
  rfAtual = 0;
  fatorAcucarAtual = 0;
  quantidadeDeTentativas = 0;

  quantidadeAgua = 0;
  totalGorduraAgua = 0;
  totalSnfAgua = 0;

  quantidadeLeiteIntegral=0;
  totalGorduraLeiteIntegral=0;
  totalSnfLeiteIntegral=0;

  quantidadeLactose=0;
  totalGorduraLactose=0;
  totalSnfLactose=0;

  quantidadePreIntegral = 0;
  totalGorduraPreIntegral = 0;
  totalSnfPreIntegral = 0;

  quantidadePreDesnatado = 0;
  totalGorduraPreDesnatado = 0;
  totalSnfPreDesnatado = 0;

  quantidadeButterOil = 0;
  totalGorduraButterOil = 0;
  totalSnfButterOil = 0;

  totalSnf = 0;
  totalGordura = 0;

  totalPartida = 0;

  tfAtual = 100;

  public acrescentarMateriaPrima(nome: string, analiseSnf: number, analiseGordura: number, acucar: number) {
    if(nome=='leiteIntegral'){
      this.quantidadeLeiteIntegral += 1;
      this.totalSnfLeiteIntegral = this.calcularSnf(analiseSnf, this.quantidadeLeiteIntegral);
      this.totalGorduraLeiteIntegral = this.calcularGordura(analiseGordura, this.quantidadeLeiteIntegral);
      this.totalGordura = this.totalGorduraAgua + this.totalGorduraPreIntegral + this.totalGorduraPreDesnatado + this.totalGorduraButterOil+this.totalGorduraLactose+this.totalGorduraLeiteIntegral;
      this.totalSnf = this.totalSnfAgua + this.totalSnfPreIntegral + this.totalSnfPreDesnatado + this.totalSnfButterOil+this.totalSnfLactose+this.totalSnfLeiteIntegral;
      this.totalPartida = this.quantidadeAgua + this.quantidadePreIntegral + this.quantidadePreDesnatado + this.quantidadeButterOil+this.quantidadeLactose+this.quantidadeLeiteIntegral;
      this.tfAtual = parseFloat(this.calcularTf(this.totalGordura, this.totalSnf, acucar, this.totalPartida));
      this.rfAtual = parseFloat(this.calcularRf(this.totalGordura, this.totalSnf));
      this.fatorAcucarAtual = parseFloat(this.calcularFatorAcucar(acucar,parseFloat( this.totalGordura.toFixed(2))));

    }
    if (nome == 'agua') {
      this.quantidadeAgua += 1;
      this.totalSnfAgua = this.calcularSnf(analiseSnf, this.quantidadeAgua);
      this.totalGorduraAgua = this.calcularGordura(analiseGordura, this.quantidadeAgua);
      this.totalGordura = this.totalGorduraAgua + this.totalGorduraPreIntegral + this.totalGorduraPreDesnatado + this.totalGorduraButterOil+this.totalGorduraLactose+this.totalGorduraLeiteIntegral;
      this.totalSnf = this.totalSnfAgua + this.totalSnfPreIntegral + this.totalSnfPreDesnatado + this.totalSnfButterOil+this.totalSnfLactose+this.totalSnfLeiteIntegral;
      this.totalPartida = this.quantidadeAgua + this.quantidadePreIntegral + this.quantidadePreDesnatado + this.quantidadeButterOil+this.quantidadeLactose+this.quantidadeLeiteIntegral;
      this.tfAtual = parseFloat(this.calcularTf(this.totalGordura, this.totalSnf, acucar, this.totalPartida));
      this.rfAtual = parseFloat(this.calcularRf(this.totalGordura, this.totalSnf));
      this.fatorAcucarAtual = parseFloat(this.calcularFatorAcucar(acucar,parseFloat( this.totalGordura.toFixed(2))));
    }
    if(nome=='lactose'){
      this.quantidadeLactose += 1;
      this.totalSnfLactose= this.calcularSnf(analiseSnf, this.quantidadeLactose);
      this.totalGorduraLactose = this.calcularGordura(analiseGordura, this.quantidadeLactose);
      this.totalGordura = this.totalGorduraAgua + this.totalGorduraPreIntegral + this.totalGorduraPreDesnatado + this.totalGorduraButterOil+this.totalGorduraLactose+this.totalGorduraLeiteIntegral;
      this.totalSnf = this.totalSnfAgua + this.totalSnfPreIntegral + this.totalSnfPreDesnatado + this.totalSnfButterOil+this.totalSnfLactose+this.totalSnfLeiteIntegral;
      this.totalPartida = this.quantidadeAgua + this.quantidadePreIntegral + this.quantidadePreDesnatado + this.quantidadeButterOil+this.quantidadeLactose+this.quantidadeLeiteIntegral;
      this.tfAtual = parseFloat(this.calcularTf(this.totalGordura, this.totalSnf, acucar, this.totalPartida));
      this.rfAtual = parseFloat(this.calcularRf(this.totalGordura, this.totalSnf));
      this.fatorAcucarAtual = parseFloat(this.calcularFatorAcucar(acucar,parseFloat( this.totalGordura.toFixed(2))));

    }
    if (nome == 'preDesnatado') {
      this.quantidadePreDesnatado+=1;
      this.totalSnfPreDesnatado = this.calcularSnf(analiseSnf, this.quantidadePreDesnatado);
      this.totalGorduraPreDesnatado = this.calcularGordura(analiseGordura, this.quantidadePreDesnatado);
      this.totalGordura = this.totalGorduraAgua + this.totalGorduraPreIntegral + this.totalGorduraPreDesnatado + this.totalGorduraButterOil+this.totalGorduraLactose+this.totalGorduraLeiteIntegral;
      this.totalSnf = this.totalSnfAgua + this.totalSnfPreIntegral + this.totalSnfPreDesnatado + this.totalSnfButterOil+this.totalSnfLactose+this.totalSnfLeiteIntegral;
      this.totalPartida = this.quantidadeAgua + this.quantidadePreIntegral + this.quantidadePreDesnatado + this.quantidadeButterOil+this.quantidadeLactose+this.quantidadeLeiteIntegral;
      this.tfAtual = parseFloat(this.calcularTf(this.totalGordura, this.totalSnf, acucar, this.totalPartida));
      this.rfAtual = parseFloat(this.calcularRf(this.totalGordura, this.totalSnf));
      this.fatorAcucarAtual = parseFloat(this.calcularFatorAcucar(acucar,parseFloat( this.totalGordura.toFixed(2))));
    }
    if (nome == 'preIntegral') {
      this.quantidadePreIntegral += 1;
      this.totalSnfPreIntegral = this.calcularSnf(analiseSnf, this.quantidadePreIntegral);
      this.totalGorduraPreIntegral = this.calcularGordura(analiseGordura, this.quantidadePreIntegral);
      this.totalGordura = this.totalGorduraAgua + this.totalGorduraPreIntegral + this.totalGorduraPreDesnatado + this.totalGorduraButterOil+this.totalGorduraLactose+this.totalGorduraLeiteIntegral;
      this.totalSnf = this.totalSnfAgua + this.totalSnfPreIntegral + this.totalSnfPreDesnatado + this.totalSnfButterOil+this.totalSnfLactose+this.totalSnfLeiteIntegral;
      this.totalPartida = this.quantidadeAgua + this.quantidadePreIntegral + this.quantidadePreDesnatado + this.quantidadeButterOil+this.quantidadeLactose+this.quantidadeLeiteIntegral;
      this.tfAtual = parseFloat(this.calcularTf(this.totalGordura, this.totalSnf, acucar, this.totalPartida));
      this.rfAtual = parseFloat(this.calcularRf(this.totalGordura, this.totalSnf));
      this.fatorAcucarAtual = parseFloat(this.calcularFatorAcucar(acucar,parseFloat( this.totalGordura.toFixed(2))));
    }
    if (nome == 'butterOil') {
      this.quantidadeButterOil += 1;
      this.totalSnfButterOil = this.calcularSnf(analiseSnf, this.quantidadeButterOil);
      this.totalGorduraButterOil = this.calcularGordura(analiseGordura, this.quantidadeButterOil);
      this.totalGordura = this.totalGorduraAgua + this.totalGorduraPreIntegral + this.totalGorduraPreDesnatado + this.totalGorduraButterOil+this.totalGorduraLactose+this.totalGorduraLeiteIntegral;
      this.totalSnf = this.totalSnfAgua + this.totalSnfPreIntegral + this.totalSnfPreDesnatado + this.totalSnfButterOil+this.totalSnfLactose+this.totalSnfLeiteIntegral;
      this.totalPartida = this.quantidadeAgua + this.quantidadePreIntegral + this.quantidadePreDesnatado + this.quantidadeButterOil+this.quantidadeLactose+this.quantidadeLeiteIntegral;
      this.tfAtual = parseFloat(this.calcularTf(this.totalGordura, this.totalSnf, acucar, this.totalPartida));
      this.rfAtual = parseFloat(this.calcularRf(this.totalGordura, this.totalSnf));
      this.fatorAcucarAtual = parseFloat(this.calcularFatorAcucar(acucar,parseFloat( this.totalGordura.toFixed(2))));
    }
  }

  public retirarMateriaPrima(nome: string, analiseSnf: number, analiseGordura: number, acucar: number) {
    if(nome=='leiteIntegral'){
      this.quantidadeLeiteIntegral -= 1;
      this.totalSnfLeiteIntegral = this.calcularSnf(analiseSnf, this.quantidadeLeiteIntegral);
      this.totalGorduraLeiteIntegral = this.calcularGordura(analiseGordura, this.quantidadeLeiteIntegral);
      this.totalGordura = this.totalGorduraAgua + this.totalGorduraPreIntegral + this.totalGorduraPreDesnatado + this.totalGorduraButterOil+this.totalGorduraLactose+this.totalGorduraLeiteIntegral;
      this.totalSnf = this.totalSnfAgua + this.totalSnfPreIntegral + this.totalSnfPreDesnatado + this.totalSnfButterOil+this.totalSnfLactose+this.totalSnfLeiteIntegral;
      this.totalPartida = this.quantidadeAgua + this.quantidadePreIntegral + this.quantidadePreDesnatado + this.quantidadeButterOil+this.quantidadeLactose+this.quantidadeLeiteIntegral;
      this.tfAtual = parseFloat(this.calcularTf(this.totalGordura, this.totalSnf, acucar, this.totalPartida));
      this.rfAtual = parseFloat(this.calcularRf(this.totalGordura, this.totalSnf));
      this.fatorAcucarAtual = parseFloat(this.calcularFatorAcucar(acucar,parseFloat( this.totalGordura.toFixed(2))));
    }
    if(nome=='lactose'){
      this.quantidadeLactose -= 1;
      this.totalSnfLactose = this.calcularSnf(analiseSnf, this.quantidadeLactose);
      this.totalGorduraLactose = this.calcularGordura(analiseGordura, this.quantidadeLactose);
      this.totalGordura = this.totalGorduraAgua + this.totalGorduraPreIntegral + this.totalGorduraPreDesnatado + this.totalGorduraButterOil+this.totalGorduraLactose+this.totalGorduraLeiteIntegral;
      this.totalSnf = this.totalSnfAgua + this.totalSnfPreIntegral + this.totalSnfPreDesnatado + this.totalSnfButterOil+this.totalSnfLactose+this.totalSnfLeiteIntegral;
      this.totalPartida = this.quantidadeAgua + this.quantidadePreIntegral + this.quantidadePreDesnatado + this.quantidadeButterOil+this.quantidadeLactose+this.quantidadeLeiteIntegral;
      this.tfAtual = parseFloat(this.calcularTf(this.totalGordura, this.totalSnf, acucar, this.totalPartida));
      this.rfAtual = parseFloat(this.calcularRf(this.totalGordura, this.totalSnf));
      this.fatorAcucarAtual = parseFloat(this.calcularFatorAcucar(acucar,parseFloat( this.totalGordura.toFixed(2))));

    }
    if (nome == 'agua') {
      this.quantidadeAgua -= 1;
      this.totalSnfAgua = this.calcularSnf(analiseSnf, this.quantidadeAgua,);
      this.totalGorduraAgua = this.calcularGordura(analiseGordura, this.quantidadeAgua);
      this.totalGordura = this.totalGorduraAgua + this.totalGorduraPreIntegral + this.totalGorduraPreDesnatado + this.totalGorduraButterOil+this.totalGorduraLactose+this.totalGorduraLeiteIntegral;
      this.totalSnf = this.totalSnfAgua + this.totalSnfPreIntegral + this.totalSnfPreDesnatado + this.totalSnfButterOil+this.totalSnfLactose+this.totalSnfLeiteIntegral;
      this.totalPartida = this.quantidadeAgua + this.quantidadePreIntegral + this.quantidadePreDesnatado + this.quantidadeButterOil+this.quantidadeLactose+this.quantidadeLeiteIntegral;
      this.tfAtual = parseFloat(this.calcularTf(this.totalGordura, this.totalSnf, acucar, this.totalPartida));
      this.rfAtual = parseFloat(this.calcularRf(this.totalGordura, this.totalSnf));
      this.fatorAcucarAtual = parseFloat(this.calcularFatorAcucar(acucar,parseFloat( this.totalGordura.toFixed(2))));
    }
    if (nome == 'preDesnatado') {
      this.quantidadePreDesnatado -=1;
      this.totalSnfPreDesnatado = this.calcularSnf(analiseSnf, this.quantidadePreDesnatado);
      this.totalGorduraPreDesnatado = this.calcularGordura(analiseGordura, this.quantidadePreDesnatado);
      this.totalGordura = this.totalGorduraAgua + this.totalGorduraPreIntegral + this.totalGorduraPreDesnatado + this.totalGorduraButterOil+this.totalGorduraLactose+this.totalGorduraLeiteIntegral;
      this.totalSnf = this.totalSnfAgua + this.totalSnfPreIntegral + this.totalSnfPreDesnatado + this.totalSnfButterOil+this.totalSnfLactose+this.totalSnfLeiteIntegral;
      this.totalPartida = this.quantidadeAgua + this.quantidadePreIntegral + this.quantidadePreDesnatado + this.quantidadeButterOil+this.quantidadeLactose+this.quantidadeLeiteIntegral;
      this.tfAtual = parseFloat(this.calcularTf(this.totalGordura, this.totalSnf, acucar, this.totalPartida));
      this.rfAtual = parseFloat(this.calcularRf(this.totalGordura, this.totalSnf));
      this.fatorAcucarAtual = parseFloat(this.calcularFatorAcucar(acucar,parseFloat( this.totalGordura.toFixed(2))));
    }
    if (nome == 'preIntegral') {
      this.quantidadePreIntegral -= 1;
      this.totalSnfPreIntegral = this.calcularSnf(analiseSnf, this.quantidadePreIntegral);
      this.totalGorduraPreIntegral = this.calcularGordura(analiseGordura, this.quantidadePreIntegral);
      this.totalGordura = this.totalGorduraAgua + this.totalGorduraPreIntegral + this.totalGorduraPreDesnatado + this.totalGorduraButterOil+this.totalGorduraLactose+this.totalGorduraLeiteIntegral;
      this.totalSnf = this.totalSnfAgua + this.totalSnfPreIntegral + this.totalSnfPreDesnatado + this.totalSnfButterOil+this.totalSnfLactose+this.totalSnfLeiteIntegral;
      this.totalPartida = this.quantidadeAgua + this.quantidadePreIntegral + this.quantidadePreDesnatado + this.quantidadeButterOil+this.quantidadeLactose+this.quantidadeLeiteIntegral;
      this.tfAtual = parseFloat(this.calcularTf(this.totalGordura, this.totalSnf, acucar, this.totalPartida));
      this.rfAtual = parseFloat(this.calcularRf(this.totalGordura, this.totalSnf));
      this.fatorAcucarAtual = parseFloat(this.calcularFatorAcucar(acucar,parseFloat( this.totalGordura.toFixed(2))));
    }
    if (nome == 'butterOil') {
      this.quantidadeButterOil -= 1;
      this.totalSnfButterOil = this.calcularSnf(analiseSnf, this.quantidadeButterOil);
      this.totalGorduraButterOil = this.calcularGordura(analiseGordura, this.quantidadeButterOil);
      this.totalGordura = this.totalGorduraAgua + this.totalGorduraPreIntegral + this.totalGorduraPreDesnatado + this.totalGorduraButterOil+this.totalGorduraLactose+this.totalGorduraLeiteIntegral;
      this.totalSnf = this.totalSnfAgua + this.totalSnfPreIntegral + this.totalSnfPreDesnatado + this.totalSnfButterOil+this.totalSnfLactose+this.totalSnfLeiteIntegral;
      this.totalPartida = this.quantidadeAgua + this.quantidadePreIntegral + this.quantidadePreDesnatado + this.quantidadeButterOil+this.quantidadeLactose+this.quantidadeLeiteIntegral;
      this.tfAtual = parseFloat(this.calcularTf(this.totalGordura, this.totalSnf, acucar, this.totalPartida));
      this.rfAtual = parseFloat(this.calcularRf(this.totalGordura, this.totalSnf));
      this.fatorAcucarAtual = parseFloat(this.calcularFatorAcucar(acucar,parseFloat( this.totalGordura.toFixed(2))));
    }

  }

  public definirRange(minimo: number, maximo: number): number[] {
    let range = [];
    for (let x = 0; minimo <= maximo; x++) {
      range.push(parseFloat(minimo.toFixed(3)));
      parseFloat((minimo += 0.001).toFixed(3));

    }
    range.push(maximo);
    return range;
  }

  public calcularTf(gorduraTotal: number, snfTotal: number, acucarTotal: number, partidaTotal: number) {
    let totalGordura = gorduraTotal;

    let totalSnf = snfTotal;

    let acucar = acucarTotal;

    let totalPartida = partidaTotal;
    let variavel1 = (totalGordura + totalSnf + acucar);
    let variavel2 = (totalPartida + acucar);
    let tf: number = (variavel1 / variavel2) * 100;
    return tf.toFixed(2);
  }

  public calcularGordura(gorduraAnalise: number, quantidade: number) {
    return (quantidade * gorduraAnalise) / 100;
  }

  public calcularSnf(snfAnalise: number, quantidade: number) {
    return (quantidade * snfAnalise) / 100;
  }

  public calcularFatorAcucar(acucar: number, totalGordura: number) {
    return (acucar / totalGordura).toFixed(3);

  }

  public calcularRf(totalGordura: number, totalSnf: number) {
    return (totalGordura / totalSnf).toFixed(3);
  }

  public resetarValores(){
    this.rfAtual = 0;
    this.fatorAcucarAtual = 0;
    this.quantidadeDeTentativas = 0;

    this. quantidadeAgua = 0;
    this.totalGorduraAgua = 0;
    this.totalSnfAgua = 0;

    this.quantidadeLeiteIntegral=0;
    this.totalGorduraLeiteIntegral=0;
    this.totalSnfLeiteIntegral=0;

    this.quantidadePreIntegral = 0;
    this.totalGorduraPreIntegral = 0;
    this.totalSnfPreIntegral = 0;

    this.quantidadePreDesnatado = 0;
    this.totalGorduraPreDesnatado = 0;
    this.totalSnfPreDesnatado = 0;

    this.quantidadeButterOil = 0;
    this.totalGorduraButterOil = 0;
    this.totalSnfButterOil = 0;

    this.totalGorduraLactose=0;
    this.quantidadeLactose=0;
    this.totalSnfLactose=0

    this.totalSnf = 0;
    this.totalGordura = 0;

    this.totalPartida = 0;

    this.tfAtual = 100;
  }

}
