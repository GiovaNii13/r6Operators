import { Component, OnInit } from '@angular/core';
import { Mapas } from './mapas';
import { ConsultaService } from 'src/app/services/consulta.service';

@Component({
  selector: 'app-mapas',
  templateUrl: './mapas.component.html',
  styleUrls: ['./mapas.component.scss']
})
export class MapasComponent implements OnInit {

  constructor(
    private consultaService: ConsultaService
  ) { }

  mapas: Mapas[];

  ngOnInit(): void {
    this.consultaService.getAllMaps()
    .subscribe(
      (data: any[]) => {
        this.mapas = data;
  })
  }
}