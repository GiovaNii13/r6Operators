import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { ConsultaService } from 'src/app/services/consulta.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {
  usuario: User;
  formularioCadastro: FormGroup;
  emailCadastrado: boolean;
  cadastroInvalido: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private _consultaService: ConsultaService,
    private authService: AuthServiceService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.formularioCadastro = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(60)]],
      email: [null, [Validators.required, Validators.email]],
      senha: [null, [Validators.required, Validators.maxLength(15), Validators.minLength(6)]],
      endereco: this.formBuilder.group({
        cep: [null, Validators.required],
        numero: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required],
      })
    });
  }

  formSubmit() {
    if (this.formularioCadastro.valid) {
      const email = this.formularioCadastro.get('email').value;
      this.authService.verificarEmailExistente(email)
      .subscribe(emailExistente => {
        if (emailExistente) {
          this.emailCadastrado = true;
        } else {
          this.authService.cadastrarUsuario(this.formularioCadastro.value)
          .subscribe(() => {
            this.router.navigate(['/login'])
          });
        }
      });
    } else {
      this.cadastroInvalido = true;
      setTimeout(() => {
        this.cadastroInvalido = false;
      },3000)
    }
  }

  verificaValidTouchedCad(campo: string) {
    return this.formularioCadastro.get(campo).invalid && (this.formularioCadastro.get(campo).touched)
  }

  aplicaCssErro(campo: string) {
    return {
      'is-invalid': this.verificaValidTouchedCad(campo)
    }
  }

  consultaCEP() {
    const cep = this.formularioCadastro.get('endereco.cep').value;
    if (cep != null && cep !== '') {
      this._consultaService.consultaCep(cep)
      .subscribe(dados => this.populaDadosForm(dados))
    }
  }

  populaDadosForm(dados) {
    this.formularioCadastro.patchValue({
      endereco: {
        rua: dados.logradouro,
        complemento: dados.complemento,
        bairro : dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    })
  }
}
