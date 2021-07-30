import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {Estoque} from '../cadastro-estoque-materias-primas/estoque';
import {DepositosService} from '../cadastro-estoque-materias-primas/depositos.service';
import {MateriaPrimaService} from './materia-prima.service';
import {MateriaPrima} from './materia-prima';
import {Formula} from '../cadastro-formulas/formula';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-cadastro-materias-primas',
  templateUrl: './cadastro-materias-primas.component.html',
  styleUrls: ['./cadastro-materias-primas.component.css']
})
export class CadastroMateriasPrimasComponent implements OnInit {
  formularioCadastro:FormGroup;
  @ViewChild('errorTemplate') errorTemplate:TemplateRef<any>;
  @ViewChild('sucessTemplate') successTemplate:TemplateRef<any>;
  referenciaModalError:BsModalRef;
  referenciaModalSuccess:BsModalRef;
  listaMateriaPrimaResult:MateriaPrima[]=[];
  @ViewChild('desejaDeletartemplate')desejaDeletartemplate:TemplateRef<any>;
  referenciaModalDeletar:BsModalRef;
  indiceParaMateriaPrima:number=0;
  listaDeErros:string[]=[]

  constructor(private formsBuilder:FormBuilder,
              private modalService:BsModalService,
              private route:ActivatedRoute,
              private materiaPrimaService:MateriaPrimaService) { }

  ngOnInit(): void {
    this.route.data.subscribe(listaResult=>{
      this.listaMateriaPrimaResult=(<MateriaPrima[]>listaResult.listaMateriasPrimas).sort((a:MateriaPrima,b:MateriaPrima)=>{
        if(a.nome<b.nome)return -1
        if(a.nome>b.nome)return 1
        return 0
      })
    })
    this.formularioCadastro=this.formsBuilder.group({
      nome:['',[Validators.required]],
      codigo:['',[Validators.required]],
      procedencia:['',[Validators.required]],
      descricao:['',[Validators.required]]
    });
  }

  cadastrar() {
    if(this.formularioCadastro.valid){
       let materiaPrima:MateriaPrima=new MateriaPrima();
       materiaPrima.nome=this.formularioCadastro.get('nome')?.value;
       materiaPrima.descricao=this.formularioCadastro.get('descricao')?.value;
       materiaPrima.codigo=this.formularioCadastro.get('codigo')?.value;
       materiaPrima.procedencia=this.formularioCadastro.get('procedencia')?.value
       // cadastrar o deposito aqui console.log(materiaPrima)
      this.materiaPrimaService.salvarMateriaPrima(materiaPrima).subscribe(materiaPrima=>{
        this.listaMateriaPrimaResult.push(materiaPrima);
        this.listaMateriaPrimaResult.sort((a:MateriaPrima,b:MateriaPrima)=>{
          if(a.nome<b.nome)return -1
          if(a.nome>b.nome)return 1
          return 0
        })
        this.formularioCadastro.reset();
        this.referenciaModalSuccess=this.modalService.show(this.successTemplate,{class:'modal-dialog-centered'})
        setTimeout(()=>{this.referenciaModalSuccess.hide()},1000)
      },error => {
        this.listaDeErros=[]
        this.referenciaModalError=this.modalService.show(this.errorTemplate,{class:'modal-dialog-centered'})
        this.listaDeErros.push(error.error)
        this.referenciaModalError.content=this.listaDeErros;
        this.formularioCadastro.reset();
      })

    }else{
      this.listaDeErros=[]
      this.referenciaModalError=this.modalService.show(this.errorTemplate,{class:'modal-dialog-centered'});
      Object.keys(this.formularioCadastro.controls).forEach(nomeControle=>{
        if(nomeControle=='nome'&&this.formularioCadastro.get(nomeControle)?.invalid){
          this.listaDeErros.push('O nome da materia prima nao pode estar em branco')
        }
        if(nomeControle=='codigo'&&this.formularioCadastro.get(nomeControle)?.invalid){
          this.listaDeErros.push('O codigo da materia prima nao pode estar em branco')
        }
        if(nomeControle=='procedencia'&&this.formularioCadastro.get(nomeControle)?.invalid){
          this.listaDeErros.push('A procedencia da materia prima nao pode estar em branco')
        }
      })

      this.referenciaModalError.content=this.listaDeErros;
    }
  }

  excluirMateriaPrima(i: number) {
    this.indiceParaMateriaPrima=i;
    this.referenciaModalDeletar=this.modalService.show(this.desejaDeletartemplate,{class:'modal-dialog-centered'});
  }

  confirm() {
    this.materiaPrimaService.deletarMateriaPrima(this.listaMateriaPrimaResult[this.indiceParaMateriaPrima].id).subscribe(result=>{
      this.listaMateriaPrimaResult.splice(this.indiceParaMateriaPrima,1);
      this.referenciaModalDeletar.hide();
    })
  }

  decline() {
    this.referenciaModalDeletar.hide();
  }

}
