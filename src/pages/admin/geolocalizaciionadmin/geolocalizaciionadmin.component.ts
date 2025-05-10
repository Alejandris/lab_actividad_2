import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { ClientesService } from '../../../service/geolocalizacion.Service';
import { LanguageService } from '../../../service/languageService';
import { HeaderAdminComponent } from '../../../components/header-admin/header-admin.component';
import { MapaComponent } from '../../client/mapa/mapa.component';
import mapboxgl from 'mapbox-gl';
import { NgFor, NgIf } from '@angular/common';



@Component({
  selector: 'app-geolocalizaciionadmin',
  imports: [MapaComponent, HeaderAdminComponent, NgFor,NgIf],
  templateUrl: './geolocalizaciionadmin.component.html',
  styleUrl: './geolocalizaciionadmin.component.css',
  standalone: true
})
export class GeolocalizaciionadminComponent{
  clientes: any[] = []; // Definiendo la lista de clientes
  razonSocialValor = '';
  direccionValor = '';
  imagenValor: File | null = null;
  latitudValor = '';
  longitudValor = '';
  options: Array<{ value: string; display: string }> = [];
    constructor(private clientesService: ClientesService, private languageService: LanguageService, private cdRef: ChangeDetectorRef) {}
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
    manejarSeleccionEnMapa(coords: { lat: number; lng: number }) {
      console.log('🔹 Coordenadas recibidas en el formulario:', coords); // Verifica en consola
      if (coords.lat && coords.lng) {
        this.latitudValor = coords.lat.toString();
        this.longitudValor = coords.lng.toString();
      } else {
        console.warn('⚠️ No se recibieron coordenadas correctas.');
      }
    }
    
  
  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.imagenValor = input.files?.length ? input.files[0] : null;
  }
  
  convertirImagenBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  }
  
  
  async guardarCliente(event: Event) {
    event.preventDefault();

  let imagenBase64 = null;

  // Si hay imagen, conviértela antes de enviarla
  if (this.imagenValor) {
    imagenBase64 = await this.convertirImagenBase64(this.imagenValor);
  }

  const nuevoCliente = {
    razonSocial: this.razonSocialValor,
    direccion: this.direccionValor,
    ubicacion: [parseFloat(this.latitudValor), parseFloat(this.longitudValor)],
    imagenBase64: imagenBase64
  };

  this.clientesService.createCliente(nuevoCliente).subscribe((res) => {
    console.log('Cliente guardado:', res);
  
    // ✅ Limpiar los valores del formulario
    this.razonSocialValor = '';
    this.direccionValor = '';
    this.imagenValor = null;
    this.latitudValor = '';
    this.longitudValor = '';
  
    // ✅ Limpiar el input de imagen (HTML)
    const inputImagen = document.getElementById('imagen') as HTMLInputElement;
    if (inputImagen) {
      inputImagen.value = '';
    }
    this.cdRef.detectChanges();
    alert('✅ Cliente guardado y formulario limpiado');
  });
  
  
  
  
}
}