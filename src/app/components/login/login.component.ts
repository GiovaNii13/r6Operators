import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  usuario: User;
  formularioLogin: FormGroup;
  userExistente: boolean;
  usuarioInvalido: boolean = false;
  loginInvalido: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthServiceService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.formularioLogin = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      senha: [null, [Validators.required, Validators.maxLength(15), Validators.minLength(6)]]
    })
  }

  verificaValidTouchedLogin(campo: string) {
    return this.formularioLogin.get(campo).invalid && (this.formularioLogin.get(campo).touched)
  }

  aplicaCssErro(campo: string) {
    return {
      'is-invalid': this.verificaValidTouchedLogin(campo)
    }
  }

  loginSubmit() {
    if (this.formularioLogin.valid) {
      const email = this.formularioLogin.get('email').value;
      const senha = this.formularioLogin.get('senha').value;
      this.authService.verificaLogin(email, senha)
      .subscribe(contaExistente => {
        let a = contaExistente.filter( e => e.email == email && e.senha == senha)
        localStorage.setItem('user-infos', JSON.stringify(a[0]));
        
        if (a.length) {
          this.userExistente = true;
          this.usuarioInvalido = false;
          this.router.navigate(['/home']);
        } else {
          this.userExistente = false;
          this.usuarioInvalido = true;
          setTimeout(() => {
            this.usuarioInvalido = false;
          }, 3000)
          if (this.loginInvalido) {
            this.loginInvalido = false;
          }
        }
      })
    } else {
      this.loginInvalido = true;
      
      if (this.usuarioInvalido) {
        this.usuarioInvalido = false;
      }
      setTimeout(() => {
        this.loginInvalido = false
      }, 3000)
    }
  }

}
