import {Component, OnInit} from '@angular/core';
import {LoginAuthService} from './login/login/login-auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'PelManual';
  mostrarMenu:boolean=false
  constructor(private loginAuthService:LoginAuthService,private router:Router) {
  }

  ngOnInit(): void {
    this.loginAuthService.mostrarMenuEmitter.subscribe(result=>{
      this.mostrarMenu=result
    })
  }

  voltarAoLogin() {
    this.loginAuthService.usuarioAutenticado=false
    this.mostrarMenu=false
    this.router.navigate(['/login'])
  }
}
