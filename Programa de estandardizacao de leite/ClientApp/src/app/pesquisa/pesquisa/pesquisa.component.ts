import {Component, ElementRef, EventEmitter, OnInit, Renderer2, TemplateRef, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PesquisaService} from './pesquisa.service';
import {Tl} from '../../lancar-tl/lancar-tl/tl';
import {Router} from '@angular/router';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.component.html',
  styleUrls: ['./pesquisa.component.css']
})
export class PesquisaComponent implements OnInit {
  pesquisaTlForm: FormGroup;
  listaDeTlsOrganizadaPorMateriaPrima: any[] = [];
  listaDeTlsSemOrganizar: Tl[] = [];
  naoContemErrors: boolean = true;
  @ViewChild('target',{static:false})target:ElementRef
  @ViewChild('success')success:TemplateRef<any>
  referenciaModalSuccess:BsModalRef




  constructor(private formBuilder: FormBuilder,
              private pesquisaService: PesquisaService,
              private route: Router,
              private modalService:BsModalService
              ) {

  }


  ngOnInit(): void {
    this.pesquisaTlForm = this.formBuilder.group({
      data: ['', [Validators.required]],
      nota: ['', [Validators.required]],
      linhas: this.formBuilder.array([])
    });
  }

  get formArray(): FormArray {
    return this.pesquisaTlForm.get('linhas') as FormArray;
  }

  iniciarLinhas(): FormGroup {
    return this.formBuilder.group({
      data: [{value: '', disabled: true}],
      tanque: [{value: '', disabled: true}],
      gordura: [{value: '', disabled: true}],
      snf: [{value: '', disabled: true}],
      crioscopia: [{value: '', disabled: true}],
      densidade: [{value: '', disabled: true}],
      acidez: [{value: '', disabled: true}],
      notaFiscal: [{value: '', disabled: true}],
      transportadora: [{value: '', disabled: true}],
      codigoCarreta: [{value: '', disabled: true}],
      kilosRecebidos: [{value: '', disabled: true}],
      materiaPrima: [{value: '', disabled: true}],
      codigoMateriaPrima: [{value: '', disabled: true}],
      temperatura: [{value: '', disabled: true}]
    });
  }

  adicionarNovaLinha() {
    this.formArray.push(this.iniciarLinhas());
  }


  pesquisarPorData() {
    if (this.pesquisaTlForm.get('data')?.valid) {
      let data: Date = (<Date> this.pesquisaTlForm.get('data')?.value);
      let dia = data.getDate();
      let mes = data.getMonth() + 1;
      let ano = data.getFullYear();
      let dataFormatada = `${dia}-${mes}-${ano}`;
      this.pesquisaService.buscarTlPorData(dataFormatada).subscribe(listaTl => {
        this.listaDeTlsSemOrganizar = listaTl;
        this.listaDeTlsOrganizadaPorMateriaPrima = [];
        this.formArray.clear();
        this.naoContemErrors = true;
        this.listaDeTlsOrganizadaPorMateriaPrima = listaTl.sort((a, b) => {
          if (a.materiaPrima < b.materiaPrima) {
            return -1;
          }
          if (a.materiaPrima > b.materiaPrima) {
            return 1;
          }
          return 0;
        });
        this.listaDeTlsOrganizadaPorMateriaPrima.forEach(tl => {
          this.adicionarNovaLinha();
          for (let x = 0; x < this.formArray.controls.length; x++) {
            let data = this.formArray.controls[x].get('data');
            let tanque = this.formArray.controls[x].get('tanque');
            let gordura = this.formArray.controls[x].get('gordura');
            let snf = this.formArray.controls[x].get('snf');
            let crioscopia = this.formArray.controls[x].get('crioscopia');
            let densidade = this.formArray.controls[x].get('densidade');
            let acidez = this.formArray.controls[x].get('acidez');
            let notaFiscal = this.formArray.controls[x].get('notaFiscal');
            let transportadora = this.formArray.controls[x].get('transportadora');
            let codigoCarreta = this.formArray.controls[x].get('codigoCarreta');
            let kilosRecebidos = this.formArray.controls[x].get('kilosRecebidos');
            let materiaPrima = this.formArray.controls[x].get('materiaPrima');
            let codigoMateriaPrima = this.formArray.controls[x].get('codigoMateriaPrima');
            let temperatura = this.formArray.controls[x].get('temperatura');
            data?.setValue(this.listaDeTlsOrganizadaPorMateriaPrima[x].data);
            tanque?.setValue(this.listaDeTlsOrganizadaPorMateriaPrima[x].tanque);
            gordura?.setValue(this.listaDeTlsOrganizadaPorMateriaPrima[x].gordura);
            snf?.setValue(this.listaDeTlsOrganizadaPorMateriaPrima[x].snf);
            crioscopia?.setValue(this.listaDeTlsOrganizadaPorMateriaPrima[x].crioscopia);
            densidade?.setValue(this.listaDeTlsOrganizadaPorMateriaPrima[x].densidade);
            acidez?.setValue(this.listaDeTlsOrganizadaPorMateriaPrima[x].acidez);
            notaFiscal?.setValue(this.listaDeTlsOrganizadaPorMateriaPrima[x].notaFiscal);
            transportadora?.setValue(this.listaDeTlsOrganizadaPorMateriaPrima[x].transportadora);
            codigoCarreta?.setValue(this.listaDeTlsOrganizadaPorMateriaPrima[x].codigoCarreta);
            kilosRecebidos?.setValue(this.listaDeTlsOrganizadaPorMateriaPrima[x].kilosRecebidos);
            materiaPrima?.setValue(this.listaDeTlsOrganizadaPorMateriaPrima[x].materiaPrima);
            codigoMateriaPrima?.setValue(this.listaDeTlsOrganizadaPorMateriaPrima[x].codigoMateriaPrima);
            temperatura?.setValue(this.listaDeTlsOrganizadaPorMateriaPrima[x].temperatura);
          }
          this.naoContemErrors=true
          this.target.nativeElement.scrollIntoView({behavior:"smooth",block: 'end'})
        });
      }, error => {
        this.naoContemErrors = false;
      });
    }
  }

  pesquisarPorNota() {
    if (this.pesquisaTlForm.get('nota')?.valid) {
      this.pesquisaService.buscarTlPorNotaFiscal(this.pesquisaTlForm.get('nota')?.value).subscribe(tl => {
        this.listaDeTlsSemOrganizar = [];
        this.listaDeTlsOrganizadaPorMateriaPrima = [];//zero a lista
        this.formArray.clear();
        this.listaDeTlsOrganizadaPorMateriaPrima.push(tl);//adiciona tl encontrado
        this.listaDeTlsSemOrganizar.push(tl)
        this.listaDeTlsOrganizadaPorMateriaPrima.forEach(tlLista => {
          this.adicionarNovaLinha();
          for (let x = 0; x < this.formArray.controls.length; x++) {
            let data = this.formArray.controls[x].get('data');
            let tanque = this.formArray.controls[x].get('tanque');
            let gordura = this.formArray.controls[x].get('gordura');
            let snf = this.formArray.controls[x].get('snf');
            let crioscopia = this.formArray.controls[x].get('crioscopia');
            let densidade = this.formArray.controls[x].get('densidade');
            let acidez = this.formArray.controls[x].get('acidez');
            let notaFiscal = this.formArray.controls[x].get('notaFiscal');
            let transportadora = this.formArray.controls[x].get('transportadora');
            let codigoCarreta = this.formArray.controls[x].get('codigoCarreta');
            let kilosRecebidos = this.formArray.controls[x].get('kilosRecebidos');
            let materiaPrima = this.formArray.controls[x].get('materiaPrima');
            let codigoMateriaPrima = this.formArray.controls[x].get('codigoMateriaPrima');
            let temperatura = this.formArray.controls[x].get('temperatura');
            data?.setValue(this.listaDeTlsOrganizadaPorMateriaPrima[x].data);
            tanque?.setValue(this.listaDeTlsOrganizadaPorMateriaPrima[x].tanque);
            gordura?.setValue(this.listaDeTlsOrganizadaPorMateriaPrima[x].gordura);
            snf?.setValue(this.listaDeTlsOrganizadaPorMateriaPrima[x].snf);
            crioscopia?.setValue(this.listaDeTlsOrganizadaPorMateriaPrima[x].crioscopia);
            densidade?.setValue(this.listaDeTlsOrganizadaPorMateriaPrima[x].densidade);
            acidez?.setValue(this.listaDeTlsOrganizadaPorMateriaPrima[x].acidez);
            notaFiscal?.setValue(this.listaDeTlsOrganizadaPorMateriaPrima[x].notaFiscal);
            transportadora?.setValue(this.listaDeTlsOrganizadaPorMateriaPrima[x].transportadora);
            codigoCarreta?.setValue(this.listaDeTlsOrganizadaPorMateriaPrima[x].codigoCarreta);
            kilosRecebidos?.setValue(this.listaDeTlsOrganizadaPorMateriaPrima[x].kilosRecebidos);
            materiaPrima?.setValue(this.listaDeTlsOrganizadaPorMateriaPrima[x].materiaPrima);
            codigoMateriaPrima?.setValue(this.listaDeTlsOrganizadaPorMateriaPrima[x].codigoMateriaPrima);
            temperatura?.setValue(this.listaDeTlsOrganizadaPorMateriaPrima[x].temperatura);
          }
        });
        this.target.nativeElement.scrollIntoView({behavior:"smooth",block: 'end'})
        this.naoContemErrors=true
      }, error => {
        this.naoContemErrors = false;

      });
    }

  }

  resetarNota() {
    this.pesquisaTlForm.get('nota')?.reset();
  }

  resetarData() {
    this.pesquisaTlForm.get('data')?.reset();
  }




  deletar(i: number) {
    this.pesquisaService.deletarTl(this.listaDeTlsSemOrganizar[i].id).subscribe((tl)=>{
      this.listaDeTlsOrganizadaPorMateriaPrima.splice(this.listaDeTlsSemOrganizar[i].id,1)
      this.pesquisaService.buscarTlPorData(tl.data).subscribe(tlLista=>{
        this.listaDeTlsSemOrganizar=tlLista
      },error => {
        this.naoContemErrors = false;
      })
      this.formArray.removeAt(i)
    })

  }
}
