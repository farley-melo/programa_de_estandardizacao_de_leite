import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Usuario} from './usuario';
import {LoginAuthService} from './login-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup
  private usuario:Usuario

  constructor(private formBuilder:FormBuilder,private loginAuthService:LoginAuthService) { }

  ngOnInit(): void {
    this.loginForm=this.formBuilder.group({
      email:['',Validators.required],
      senha:['',Validators.required]
    })
  }

  fazerLogin() {
    this.usuario=new Usuario()
    this.usuario.email=this.loginForm.get('email')?.value
    this.usuario.senha=this.loginForm.get('senha')?.value
    console.log('senha '+this.usuario.senha+' email '+this.usuario.email)
    this.loginAuthService.fazerLogin(this.usuario)

  }
}
