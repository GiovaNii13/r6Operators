import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ConsultaService {

  constructor(private _http: HttpClient) {}

  consultaCEP(cep: string) {
    cep = cep.replace(/\D/g, '');
    if (cep !== '') {
      const validacep = /^[0-9]{8}$/;
      if (validacep.test(cep)){
        return this._http.get(`//viacep.com.br/ws/${cep}/json/`)
      }
    }
    return of({})
  }


}