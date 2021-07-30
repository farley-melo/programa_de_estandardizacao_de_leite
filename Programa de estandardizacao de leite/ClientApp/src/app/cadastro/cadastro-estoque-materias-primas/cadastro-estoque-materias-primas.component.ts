import {Component, OnInit, TemplateRef, ViewChild, ViewChildren} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {DepositosService} from './depositos.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {ValidateFn} from 'codelyzer/walkerFactory/walkerFn';
import {Estoque} from './estoque';
import {MateriaPrimaService} from '../cadastro-materias-primas/materia-prima.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-cadastro-estoque-materias-primas',
  templateUrl: './cadastro-estoque-materias-primas.component.html',
  styleUrls: ['./cadastro-estoque-materias-primas.component.css']
})
export class CadastroEstoqueMateriasPrimasComponent implements OnInit {

  formularioCadastro:FormGroup;
  @ViewChild('errorTemplate') errorTemplate:TemplateRef<any>;
  @ViewChild('sucessTemplate')successTemplate:TemplateRef<any>;
  referenciaModalError:BsModalRef;
  referenciaModalSuccess:BsModalRef;
  listaDepositos:Estoque[]=[]
  order:string='nome'
  @ViewChild('desejaDeletartemplate')desejaDeletartemplate:TemplateRef<any>;
  referenciaModalDeletar:BsModalRef;
  indiceParaDeleçaoTanque:number=0;
  listarErrors:string[]=[];

  constructor(private formsBuilder:FormBuilder,
              private modalService:BsModalService,
              private depositoService:DepositosService,
              private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(listaResult=>{
        this.listaDepositos=(<Estoque[]>(listaResult.listaDepositos)).sort((a:Estoque,b:Estoque)=>{
          if(a.nome<b.nome)return -1
          if(a.nome>b.nome)return 1
          return 0
        })
    })
    this.formularioCadastro=this.formsBuilder.group({
      nome:['',[Validators.required]],
      capacidade:['',Validators.required],
    });
  }



  //validacoes
  somenteNumeros($event: KeyboardEvent) {
    let patt = /^([0-9])$/;
    let result = patt.test($event.key);
    return result;

  }

  cadastrar() {
    if(this.formularioCadastro.valid){
      //cadatra o deposito no banco de dados
      let estoque:Estoque=new Estoque();
      estoque.nome=this.formularioCadastro.get('nome')?.value;
      estoque.capacidade=this.formularioCadastro.get('capacidade')?.value;
      this.depositoService.salvarDeposito(estoque).subscribe(deposito=>{
          this.listaDepositos.push(deposito);
          this.listaDepositos.sort((a:Estoque,b:Estoque)=>{
            if(a.nome<b.nome)return -1
            if(a.nome>b.nome)return 1
            return 0
          })
          this.formularioCadastro.reset();
          this.referenciaModalSuccess=this.modalService.show(this.successTemplate,{class:'modal-dialog-centered'})
          setTimeout(()=>{this.referenciaModalSuccess.hide()},1000)
      },error => {
        this.listarErrors=[]
        this.referenciaModalError=this.modalService.show(this.errorTemplate,{class:'modal-dialog-centered'})
        this.listarErrors.push(error.error)
        this.referenciaModalError.content=this.listarErrors;
        this.formularioCadastro.reset();
      })

    }else{
      this.listarErrors=[]
      this.referenciaModalError=this.modalService.show(this.errorTemplate,{class:'modal-dialog-centered'});
      Object.keys(this.formularioCadastro.controls).forEach(formNome=>{
        if(formNome=='nome'&&this.formularioCadastro.get(formNome)?.invalid){
          this.listarErrors.push('O nome nao pode estar em branco')
        }
        if(formNome=='capacidade'&&this.formularioCadastro.get(formNome)?.invalid){
          this.listarErrors.push('A capacidade nao pode estar em branco')
        }
        if(formNome=='materiasPrimas'&&this.formularioCadastro.get(formNome)?.invalid){
          this.listarErrors.push('Deve haver pelo menos uma materia prima selecionada')
        }
      });
      this.referenciaModalError.content=this.listarErrors;
    }
  }

  excluirEstoque(i: number) {
    this.indiceParaDeleçaoTanque=i;
    this.referenciaModalDeletar=this.modalService.show(this.desejaDeletartemplate,{class:'modal-dialog-centered'});
  }

  confirm() {
    this.depositoService.deletarDeposito(this.listaDepositos[this.indiceParaDeleçaoTanque].nome).subscribe(result=>{
      this.listaDepositos.splice(this.indiceParaDeleçaoTanque,1);
      this.referenciaModalDeletar.hide();
    })
  }

  decline() {
    this.referenciaModalDeletar.hide();
  }
}
