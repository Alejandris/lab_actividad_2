import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatbotService {
  private API_URL= 'http://localhost:5001/api/chatbot'; // URL de la API

  constructor(private http: HttpClient) {}

  // Método para enviar la pregunta al chatbot
    sendQuestion(data: { pregunta: string; room_id: number }): Observable<any> {
    return this.http.post<any>(this.API_URL, data);
  }
}
