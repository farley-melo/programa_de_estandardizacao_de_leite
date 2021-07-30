import {Injectable} from '@angular/core';
import {Usuario} from './usuario';
import {Router} from '@angular/router';
import {EventEmitter} from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class LoginAuthService {
  usuarioAutenticado: boolean = false;
  mostrarMenuEmitter = new EventEmitter<boolean>();

  constructor(private router: Router) {
  }

  fazerLogin(usuario: Usuario) {
    if (usuario.email === 'farleydeftones@gmail.com' && usuario.senha === '1234') {
      this.usuarioAutenticado = true;
      this.router.navigate(['/estoque']);
      this.mostrarMenuEmitter.emit(this.usuarioAutenticado);

    } else {
      this.usuarioAutenticado = false;
      this.mostrarMenuEmitter.emit(this.usuarioAutenticado);
    }

  }
}
