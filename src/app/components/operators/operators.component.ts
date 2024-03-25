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

  filtros = {
    ordemAlfabetica: false,
    ordemAlfabeticaReversa: false,
    atacantes: false,
    defensores: false,
    padrao: false,
    filtragemPorDigitacao: false
  };
  detalhesOperador: boolean = false;
   
  constructor(
    private consultaService: ConsultaService
    ) { }

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

    if (this.filtros.atacantes) {
      this.operadoresFiltrados = this.operadoresFiltrados.filter(operador => operador.tipo === 'ataque');
    }
    else if (this.filtros.defensores) {
      this.operadoresFiltrados = this.operadoresFiltrados.filter(operador => operador.tipo === 'defesa');
    }

    else if (this.filtros.ordemAlfabetica) {
      this.operadoresFiltrados.sort((a, b) => a.nome.localeCompare(b.nome));
    }

    else if (this.filtros.ordemAlfabeticaReversa) {
      this.operadoresFiltrados.sort((a, b) => b.nome.localeCompare(a.nome));
    } 
    else if (this.filtros.padrao) {
      this.operadoresFiltrados = [...this.operadores]
    }
  }
  
  mostrarDetalhesDoOperador(operador: Operator[]) {
    this.detalhesOperador = true;
    this.operadorSelecionado = operador;
  }

  limparCampo() {
    this.operadorDigitado = '';
    this.operadoresFiltrados = [...this.operadores];
    this.filtros.padrao = true;
  }

  toggleFiltro(filtro: string) {
    this.filtros[filtro] = !this.filtros[filtro];
    if (this.filtros[filtro]) {
      Object.keys(this.filtros).forEach(key => {
        if (key !== filtro) {
          this.filtros[key] = false;
        }
      });
    }
    this.aplicarFiltragens();
  }

  fecharDetalhes() {
    this.detalhesOperador = false;
  }

  filtrarPorDigitacao(texto: string): void {
    this.operadoresFiltrados = this.operadores.filter(operador =>
      operador.nome.toLowerCase().startsWith(texto.toLowerCase())
    );
  }

}
