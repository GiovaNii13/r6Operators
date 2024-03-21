import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class ConsultaService {

  constructor(private _http: HttpClient) {}



  consultaCep(cep: string) {
    cep = cep.replace(/\D/g, '');
    if (cep !== '') {
      const validacep = /^[0-9]{8}$/;
      if (validacep.test(cep)){
        return this._http.get(`//viacep.com.br/ws/${cep}/json/`)
      }
    }
    return of({})
  }

  getAllOperators(): Observable<any[]> {
    return this._http.get<any[]>(environment.apiUrlOperadores)
  }

  getAllMaps(): Observable<any[]> {
    return this._http.get<any[]>(environment.apiUrlMaps)
  }
}