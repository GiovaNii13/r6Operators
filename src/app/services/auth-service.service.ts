import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map, take } from 'rxjs/operators';
import { environment } from "src/environments/environment";
import { User } from "../user";

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  user : User[];

  private usuarioLogadoSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private _http: HttpClient) {
    this.verificarAutenticacaoInicial();
  }

  private verificarAutenticacaoInicial() {
    const userInfo = localStorage.getItem('user-infos');
    if (userInfo) {
      this.usuarioLogadoSubject.next(true);
    }
  }

  cadastrarUsuario(usuario: any): Observable<any> {
    return this._http.post<any>(environment.apiUrlUsers, usuario);
  }

  verificarEmailExistente(email: string): Observable<boolean> {
    return this._http.get<any[]>(environment.apiUrlUsers).pipe(
      map(usuarios => {
        return usuarios.some(usuario => usuario.email === email);
      }) 
    );
  }

  verificaLogin(email: string, senha: string): Observable<any> {
    return this._http.get<any[]>(environment.apiUrlUsers).pipe(
      take(1),
      map(usuarios => {
        const contaExistente = usuarios.filter(u => u.email === email && u.senha === senha);
        if (contaExistente.length > 0) {
          this.fazerLogin(); 
        }
        return contaExistente;
      })
    );
  }

  fazerLogin(): void {
    this.usuarioLogadoSubject.next(true);
  }

  fazerLogout(): void {
    localStorage.removeItem('user-infos');
    this.usuarioLogadoSubject.next(false);
  }

  logado(): Observable<boolean> {
    return this.usuarioLogadoSubject.asObservable();
  }

  editarUsuario(usuarioEditado: any): Observable<any> {
    const userId = JSON.parse(localStorage.getItem('user-infos')).id; 
    const url = `${environment.apiUrlUsers}/${userId}`;
    return this._http.put<any>(url, usuarioEditado);
  }

  deletarConta() {
    const userId = JSON.parse(localStorage.getItem('user-infos')).id; 
    const url = `${environment.apiUrlUsers}/${userId}`;
    return this._http.delete<any>(url);
  }
}
