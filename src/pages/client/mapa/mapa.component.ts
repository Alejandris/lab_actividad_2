import { AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';


@Component({
  selector: 'app-mapa',
  imports: [],
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.css'
})
  export class MapaComponent implements AfterViewInit {
    @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;
    @Output() coordenadasSeleccionadas = new EventEmitter<{ lat: number; lng: number }>();
  
    map!: mapboxgl.Map;
    marker!: mapboxgl.Marker;
    geocoder!: MapboxGeocoder;
    constructor() {}
    ngAfterViewInit(): void {
      
      this.map = new mapboxgl.Map({
        container: this.mapContainer.nativeElement,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-74.06, 4.65], // Bogotá como ubicación por defecto
        zoom: 11,
        accessToken: 'pk.eyJ1IjoiYWxlamFuZHJpcyIsImEiOiJjbThweXQ0bnowaTh6MmtxMWZqZDllMTBzIn0.AsLrn4qIDHJHx4E01XfOTQ'
      });
  
      // Agregar búsqueda de ubicaciones con Mapbox Geocoder
      this.geocoder = new MapboxGeocoder({
        accessToken: 'pk.eyJ1IjoiYWxlamFuZHJpcyIsImEiOiJjbThweXQ0bnowaTh6MmtxMWZqZDllMTBzIn0.AsLrn4qIDHJHx4E01XfOTQ', // ✅ Agregar aquí directamente
        mapboxgl: mapboxgl,
        placeholder: 'Buscar ubicación en Colombia...',
        countries: 'co',
        language: 'es',
        types: 'address,place,poi',
        zoom: 14,
        marker: false,
        limit: 10
      });
  
      this.map.addControl(this.geocoder, 'top-left');
  
      this.geocoder.on('result', (e: any) => {
        const coords = e.result.geometry.coordinates;
        this.actualizarMarcador(coords);
        this.coordenadasSeleccionadas.emit({ lat: coords[1], lng: coords[0] });
      });
  
      // Capturar coordenadas al hacer clic en el mapa
      this.map.on('click', (e: mapboxgl.MapMouseEvent) => {
        const coords = { lat: e.lngLat.lat, lng: e.lngLat.lng };
        console.log('📍 Coordenadas seleccionadas en el mapa:', coords); // Verifica en la consola
        this.coordenadasSeleccionadas.emit(coords);
      });
      
    }
  
    actualizarMarcador(coords: [number, number]): void {
      if (this.marker) {
        this.marker.setLngLat(coords);
      } else {
        this.marker = new mapboxgl.Marker().setLngLat(coords).addTo(this.map);
      }
      this.map.flyTo({ center: coords });
    }
  }