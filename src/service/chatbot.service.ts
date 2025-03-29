import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatbotService {
  private chatbotUrl = 'http://localhost:5001/chat';

  constructor(private http: HttpClient) {}

  sendQuestion(data: { pregunta: string; room_id: string }): Observable<any> {
    return this.http.post(this.chatbotUrl, data);
  }
}
