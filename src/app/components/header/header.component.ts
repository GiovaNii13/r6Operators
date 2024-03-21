
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() close: EventEmitter<any> = new EventEmitter();
  editOn: boolean = false;
  usuarioLogado$: Observable<boolean>;
  logOut: boolean = false;
  deleteOn: boolean = false;

  constructor(
    private authService: AuthServiceService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.usuarioLogado$ = this.authService.logado();
  }

  openEdit() {
    this.editOn = true;
  }

  changeLogOut() {
    this.logOut = !this.logOut;
  }

  closeEdit() {
    this.editOn = false;
  }

  sair() {
    this.logOut = false;
    this.router.navigate(['/'])
    return this.authService.fazerLogout();
  }

  openDelete() {
    this.deleteOn = true;
  }

  closeDelete() {
    this.deleteOn = false;
  }

  deletar() {
    this.deleteOn = false
    this.authService.deletarConta().subscribe(() => {
      localStorage.removeItem('user-infos');
      this.sair()
    });
  }
}
