import {AfterViewInit, Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {Tl} from './tl';
import {LancarTlService} from './lancar-tl.service';
import {Estoque} from '../../cadastro/cadastro-estoque-materias-primas/estoque';
import {MateriaPrima} from '../../cadastro/cadastro-materias-primas/materia-prima';
import {ActivatedRoute} from '@angular/router';
import {isUndefined} from 'ngx-bootstrap/chronos/utils/type-checks';


@Component({
  selector: 'app-lancar-tl',
  templateUrl: './lancar-tl.component.html',
  styleUrls: ['./lancar-tl.component.css']
})
export class LancarTlComponent implements OnInit,AfterViewInit {
  @ViewChild('errorTemplate') errorTemplate: TemplateRef<any>;
  @ViewChild('sucessTemplate') successTemplate: TemplateRef<any>;
  referenciaModalError: BsModalRef;
  referenciaModalSuccess: BsModalRef;
  formularioEntradaMateriasPrimas: FormGroup;
  listarErrors: string[] = [];
  listaDeDepositos:string[];
  listaDeMateriasPrimas:string[];
  listaDeMateriasPrimasObject:MateriaPrima[]
  constructor(private formBuilder: FormBuilder,
              private modalService: BsModalService,
              private tlService:LancarTlService,
              private router:ActivatedRoute) {
  }

  ngOnInit(): void {
    this.router.data.subscribe(result=>{
      this.listaDeDepositos=result.listaDepositos.map((deposito:Estoque)=>deposito.nome)
      this.listaDeMateriasPrimas=result.listaMateriasPrimas.map((materiaPrima:MateriaPrima)=>materiaPrima.nome+'-'+materiaPrima.descricao+'/'+materiaPrima.procedencia)
      this.listaDeMateriasPrimasObject=result.listaMateriasPrimas
    })
    this.formularioEntradaMateriasPrimas = this.formBuilder.group({
      data: [new Date(), [Validators.required]],
      tanque: ['', [Validators.required]],
      gordura: ['', [Validators.required]],
      snf: ['', [Validators.required]],
      crioscopia: ['', [Validators.required]],
      densidade: ['', [Validators.required]],
      acidez: ['', [Validators.required]],
      notaFiscal: ['', [Validators.required]],
      transportadora: ['', [Validators.required]],
      codigoCarreta: ['', [Validators.required]],
      kilosRecebidos: ['', [Validators.required]],
      materiaPrima: ['', [Validators.required]],
      codigoMateriaPrima: [''],
      temperatura: ['', [Validators.required]]
    });
  }

  ngAfterViewInit(): void {
    this.formularioEntradaMateriasPrimas.get('materiaPrima')?.valueChanges.subscribe((value:string)=>{
      if(value){
        let valor:string=value.substring(value.indexOf('-')+1,value.indexOf('/'))
        let materia:any= this.listaDeMateriasPrimasObject.find(m=>m.descricao==valor)
        if(materia){
          this.formularioEntradaMateriasPrimas.get('codigoMateriaPrima')?.setValue(materia.codigo)
        }
      }


    })
  }

  compareFnTanque(c1: any, c2:any): boolean {
    return c1 && c2 ? c1.nome === c2.nome : c1 === c2;
  }
  compareFnMateriaPrima(c1: any, c2:any): boolean {
    return c1 && c2 ? c1.nome === c2.nome : c1 === c2;
  }
  salvar() {
    if (this.formularioEntradaMateriasPrimas.valid) {
      let tl: Tl = new Tl();

      let dia=(<Date>(this.formularioEntradaMateriasPrimas.get('data')?.value)).getDate()
      let mes=(<Date>(this.formularioEntradaMateriasPrimas.get('data')?.value)).getMonth()
      let ano=(<Date>(this.formularioEntradaMateriasPrimas.get('data')?.value)).getFullYear()

      tl.data = `${dia}-${mes+1}-${ano}`
      tl.tanque = this.formularioEntradaMateriasPrimas.get('tanque')?.value
      tl.gordura = this.formularioEntradaMateriasPrimas.get('gordura')?.value
      tl.snf = this.formularioEntradaMateriasPrimas.get('snf')?.value
      tl.crioscopia = this.formularioEntradaMateriasPrimas.get('crioscopia')?.value
      tl.densidade=this.formularioEntradaMateriasPrimas.get('densidade')?.value
      tl.acidez=this.formularioEntradaMateriasPrimas.get('acidez')?.value
      tl.notaFiscal=this.formularioEntradaMateriasPrimas.get('notaFiscal')?.value
      tl.transportadora=this.formularioEntradaMateriasPrimas.get('transportadora')?.value
      tl.codigoCarreta=this.formularioEntradaMateriasPrimas.get('codigoCarreta')?.value
      tl.kilosRecebidos=this.formularioEntradaMateriasPrimas.get('kilosRecebidos')?.value
      tl.materiaPrima=this.formularioEntradaMateriasPrimas.get('materiaPrima')?.value
      tl.codigoMateriaPrima=this.formularioEntradaMateriasPrimas.get('codigoMateriaPrima')?.value
      tl.temperatura=this.formularioEntradaMateriasPrimas.get('temperatura')?.value
      this.tlService.salvarTl(tl).subscribe(tl=>{
        this.formularioEntradaMateriasPrimas.reset();
        this.referenciaModalSuccess=this.modalService.show(this.successTemplate,{class:'modal-dialog-centered'})
        setTimeout(()=>{this.referenciaModalSuccess.hide()},1000)
      },error => {
        this.listarErrors=[]
        this.referenciaModalError=this.modalService.show(this.errorTemplate,{class:'modal-dialog-centered'})
        this.listarErrors.push(error.error)
        this.referenciaModalError.content=this.listarErrors;
        this.formularioEntradaMateriasPrimas.reset();
      })
    } else {
      this.referenciaModalError = this.modalService.show(this.errorTemplate, {class: 'modal-dialog-centered'});
      this.listarErrors = [];
      Object.keys(this.formularioEntradaMateriasPrimas.controls).forEach(formNome => {
        if (formNome == 'data' && this.formularioEntradaMateriasPrimas.get(formNome)?.invalid) {
          this.listarErrors.push('A data nao pode estar em branco');
        }
        if (formNome == 'tanque' && this.formularioEntradaMateriasPrimas.get(formNome)?.invalid) {
          this.listarErrors.push('O deposito nao pode estar em branco');
        }
        if (formNome == 'gordura' && this.formularioEntradaMateriasPrimas.get(formNome)?.invalid) {
          this.listarErrors.push('A gordura nao pode estar em branco');
        }
        if (formNome == 'snf' && this.formularioEntradaMateriasPrimas.get(formNome)?.invalid) {
          this.listarErrors.push('O snf nao pode estar em branco');
        }
        if (formNome == 'crioscopia' && this.formularioEntradaMateriasPrimas.get(formNome)?.invalid) {
          this.listarErrors.push('A crioscopia nao pode estar em branco');
        }
        if (formNome == 'densidade' && this.formularioEntradaMateriasPrimas.get(formNome)?.invalid) {
          this.listarErrors.push('A densidade nao pode estar em branco');
        }
        if (formNome == 'acidez' && this.formularioEntradaMateriasPrimas.get(formNome)?.invalid) {
          this.listarErrors.push('A acidez nao pode estar em branco');
        }
        if (formNome == 'notaFiscal' && this.formularioEntradaMateriasPrimas.get(formNome)?.invalid) {
          this.listarErrors.push('A nota fiscal nao pode estar em branco');
        }
        if (formNome == 'transportadora' && this.formularioEntradaMateriasPrimas.get(formNome)?.invalid) {
          this.listarErrors.push('A transportadora nao pode estar em branco');
        }
        if (formNome == 'codigoCarreta' && this.formularioEntradaMateriasPrimas.get(formNome)?.invalid) {
         this.listarErrors.push('O codigo da carreta nao pode estar em branco');
        }
        if (formNome == 'kilosRecebidos' && this.formularioEntradaMateriasPrimas.get(formNome)?.invalid) {
          this.listarErrors.push('A quantidade recebida  nao pode estar em branco');
        }
        if (formNome == 'materiaPrima' && this.formularioEntradaMateriasPrimas.get(formNome)?.invalid) {
          this.listarErrors.push('A materia prima nao pode estar em branco');
        }
        if (formNome == 'temperatura' && this.formularioEntradaMateriasPrimas.get(formNome)?.invalid) {
          this.listarErrors.push('A temperatura nao pode estar em branco');
        }


      });
      this.referenciaModalError.content = this.listarErrors;
    }
  }


}
