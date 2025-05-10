import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private apiUrl = 'http://127.0.0.1:5000/api/ubications'; // Asegúrate de que coincide con tu Flask API

  constructor(private http: HttpClient) {}

  // Método para obtener la lista de clientes
  getClientes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Método para crear un nuevo cliente
  createCliente(cliente: any): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:5000/api/ubicationsadmin', cliente);
  }
  
}
