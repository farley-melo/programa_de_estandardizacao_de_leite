import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup } from '@angular/forms';
import {MensagemService} from './mensagem.service';
import {Mensagem} from './mensagem';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-mensagem',
  templateUrl: './mensagem.component.html',
  styleUrls: ['./mensagem.component.css']
})
export class MensagemComponent implements OnInit {
  mensagemForm:FormGroup
  @ViewChild('textAreaElement')textAreaElement:ElementRef

  constructor(private formBuilder:FormBuilder,
              private mensagemService:MensagemService,
              private router:ActivatedRoute,
              private renderer:Renderer2) { }

  ngOnInit(): void {
    this.mensagemForm=this.formBuilder.group({
      mensagem:['']
    })
    this.router.data.subscribe(data=>{
      this.mensagemForm.get('mensagem')?.setValue(data.mensagem.texto)
    })
  }

  salvarMensagem() {
    let mensagem:Mensagem=new Mensagem()
    mensagem.id=1
    mensagem.texto=this.mensagemForm.get('mensagem')?.value
    this.renderer.addClass(this.textAreaElement.nativeElement,'corDeFundoGreen')
    this.mensagemService.salvarOuAtualizarMensagem(mensagem).subscribe(result=>{

      setTimeout(()=>this.renderer.removeClass(this.textAreaElement.nativeElement,'corDeFundoGreen'),200)

    })
  }
}
