import { Component, OnInit } from '@angular/core';
import { Operator } from './operator';
import { ConsultaService } from 'src/app/services/consulta.service';

@Component({
  selector: 'app-operators',
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.scss']
})
export class OperatorsComponent implements OnInit {

  operadores: Operator[];
  operadoresFiltrados: Operator[];
  operadorSelecionado: Operator[];
  operadorDigitado: string

  filtragemAtacantes: boolean = false;
  filtragemDefensores: boolean = false;
  filtragemAlfabetica: boolean = false;
  filtragemAlfabeticaReversa: boolean = false;
  detalhesOperador: boolean = false;
  filtragemPorDigitacao: boolean = false;
  filtragemPadrao: boolean = true;
 

  constructor(private consultaService: ConsultaService) { }

  ngOnInit(): void {
    this.consultaService.getAllOperators().subscribe(data => {
      this.operadores = data.map((operador: Operator) => {
        return {
          ...operador,
          nome: operador.nome.charAt(0).toUpperCase() + operador.nome.slice(1)
        };
      });
      this.aplicarFiltragens();
    });
  }

  removerAcentos(texto: string) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }

  aplicarFiltragens(): void {
    this.operadoresFiltrados = [...this.operadores];

    if (this.filtragemAtacantes) {
      this.operadoresFiltrados = this.operadoresFiltrados.filter(operador => operador.tipo === 'ataque');
    }

    else if (this.filtragemDefensores) {
      this.operadoresFiltrados = this.operadoresFiltrados.filter(operador => operador.tipo === 'defesa');
    }

    else if (this.filtragemAlfabetica) {
      this.operadoresFiltrados.sort((a, b) => a.nome.localeCompare(b.nome));
    }

    else if (this.filtragemAlfabeticaReversa) {
      this.operadoresFiltrados.sort((a, b) => b.nome.localeCompare(a.nome));
    }

    else if (this.filtragemPorDigitacao) {
      this.operadoresFiltrados = this.operadoresFiltrados.filter(operador => operador.nome.toLowerCase().startsWith(this.removerAcentos(this.operadorDigitado)));
      if (this.operadorDigitado.length == 0) {
        this.operadoresFiltrados = [...this.operadores]
      }
    } 
    else if (this.filtragemPadrao) {
      this.operadoresFiltrados = [...this.operadores]
    }
  }
  
  mostrarDetalhesDoOperador(operador: Operator[]) {
    this.detalhesOperador = true;
    this.operadorSelecionado = operador;

  }

  turnOnOrdemAlfabetica() {
    this.filtragemPorDigitacao = false;
    this.filtragemAlfabetica = true;
    this.filtragemAlfabeticaReversa = false;
    this.filtragemAtacantes = false;
    this.filtragemDefensores = false;
    this.filtragemPadrao = false;
    this.aplicarFiltragens();
  }

  turnOnOrdemAlfabeticaReversa() {
    this.filtragemPorDigitacao = false;
    this.filtragemAlfabetica = false;
    this.filtragemAlfabeticaReversa = true;
    this.filtragemAtacantes = false;
    this.filtragemDefensores = false;
    this.filtragemPadrao = false;
    this.aplicarFiltragens();
  }

  turnOnAtacantes() {
    this.filtragemPorDigitacao = false;
    this.filtragemAlfabetica = false;
    this.filtragemAlfabeticaReversa = false;
    this.filtragemAtacantes = true;
    this.filtragemDefensores = false;
    this.filtragemPadrao = false;
    this.aplicarFiltragens();
  }

  turnOnDefensores() {
    this.filtragemPorDigitacao = false;
    this.filtragemAlfabetica = false;
    this.filtragemAlfabeticaReversa = false;
    this.filtragemAtacantes = false;
    this.filtragemDefensores = true;
    this.filtragemPadrao = false;
    this.aplicarFiltragens();
  }

  fecharDetalhes() {
    this.detalhesOperador = false;
  }

  buscarOperadorDigitado() {
    this.filtragemAlfabetica = false;
    this.filtragemAlfabeticaReversa = false;
    this.filtragemAtacantes = false;
    this.filtragemDefensores = false;
    this.filtragemPorDigitacao = true;
    this.aplicarFiltragens();
  }

  limparCampo() {
    this.operadorDigitado = '';
    this.operadoresFiltrados = [...this.operadores];
    this.filtragemPadrao = true;
  }


  listaDefault() {
    this.filtragemAlfabetica = false;
    this.filtragemAlfabeticaReversa = false;
    this.filtragemAtacantes = false;
    this.filtragemDefensores = false;
    this.filtragemPorDigitacao = false;
    this.filtragemPadrao = true;
    this.aplicarFiltragens();
  }

  fintroOn() {
    if(this.filtragemAlfabetica || this.filtragemAlfabeticaReversa
      || this.filtragemAtacantes || this.filtragemDefensores || this.filtragemPadrao)
      return
  }
}
