import { Component } from '@angular/core';
import { ClientesService } from '../../../service/geolocalizacion.Service';
import { NgFor, NgIf } from '@angular/common';
import { HeaderComponent } from "../../../components/header/header.component";
import { MapaComponent } from '../mapa/mapa.component';
import { LanguageService } from '../../../service/languageService';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-geolocalizacion',
  imports: [NgFor, HeaderComponent, RouterOutlet, NgIf],
  templateUrl: './geolocalizacion.component.html',
  styleUrl: './geolocalizacion.component.css',
  standalone: true
})
export class GeolocalizacionComponent {

  clientes: any[] = []; // Definiendo la lista de clientes
  options: Array<{ value: string; display: string }> = [];
  constructor(private clientesService: ClientesService, private languageService: LanguageService) {}

  ngOnInit(): void {
    this.getClientes();
    this.options = this.languageService.getOptions();
  }
  onChange(event: Event) {
    const lang = (event.target as HTMLSelectElement).value;
    this.languageService.setLanguage(lang); // Cambia el idioma globalmente
  }

  getClientes(): void {
    this.clientesService.getClientes().subscribe((data) => {
      this.clientes = data;
    });
  }
  
  
}
