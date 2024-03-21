import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { ConsultaService } from 'src/app/services/consulta.service';
import { User } from 'src/app/user';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  @Output() close: EventEmitter<any> = new EventEmitter();

  closeEdit(): void {
    this.close.emit();
  }
  usuario: User;

  formularioCadastro: FormGroup;

  emailCadastrado: boolean;
  edicao?:boolean;

  constructor(
    private formBuilder: FormBuilder,
    private _consultaService: ConsultaService,
    private authService: AuthServiceService
    ) { }

  ngOnInit(): void {
    const data = JSON.parse(localStorage.getItem('user-infos'));
    this.edicao = data ? true : false
    this.formularioCadastro = this.formBuilder.group({
      id : [data?.id],
      nome: [data?.nome, [Validators.required, Validators.minLength(5), Validators.maxLength(60)]],
      email: [data?.email, [Validators.required, Validators.email]],
      senha: [data?.senha, [Validators.required, Validators.maxLength(15), Validators.minLength(6)]],
      endereco: this.formBuilder.group({
        cep: [data?.endereco.cep, Validators.required],
        numero: [data?.endereco.numero, Validators.required],
        complemento: [data?.endereco.complemento || null],
        rua: [data?.endereco.rua, Validators.required],
        bairro: [data?.endereco.bairro, Validators.required],
        cidade: [data?.endereco.cidade, Validators.required],
        estado: [data?.endereco.estado, Validators.required],
      })
    });

  }
  // this.edição ? put de edição do usuario : Post de criação de um novo usuário;


  editSubmit() {
    if (this.formularioCadastro.valid) {
      this.authService.editarUsuario(this.formularioCadastro.value)
      .subscribe(() => {
            localStorage.removeItem('user-infos');
            localStorage.setItem('user-infos', JSON.stringify(this.formularioCadastro.value));
            return this.closeEdit();
          });
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
