import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';



import { RoomserService } from '../../../service/roomser.service';
import { ChatbotService } from '../../../service/chatbot.service';
import { HeaderComponent } from '../../../components/header/header.component';


@Component({
  selector: 'app-roomslist',
  imports: [NgFor, NgIf, HeaderComponent],
  templateUrl: './roomslist.component.html',
  styleUrl: './roomslist.component.css'
})
export class RoomslistComponent implements OnInit {
  
  API_URL = 'http://localhost:5000';
  rooms: any[] = [];
  selectedRoom: any = null;
  pregunta: string = '';
  respuesta: string = '';
  showChat: boolean = false;
  showForm: boolean = false;

  constructor(private http: HttpClient, private roomserService : RoomserService, private chatbotService : ChatbotService) {}

  ngOnInit(): void {
    this.loadRooms();  // Llamada a cargar habitaciones al inicio
  }

  // Cargar habitaciones desde el servidor
  loadRooms(): void {
    this.roomserService.getrooms().subscribe(
      (data: any) => {
        if (Array.isArray(data)) {
          this.rooms = data; // Asignar datos si son un array
        } else {
          console.error('El backend no devolvió un array:', data);
        }
      },
      (error : any) => {
        console.error('Error al cargar las habitaciones:', error); // Manejo de errores
      }
    );
  }

  handleChat(room: any): void {
    this.selectedRoom = room;
    this.showChat = true;
  }
  onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target) {
      this.pregunta = target.value; // Asignar el valor del input a la propiedad 'pregunta'
    }
  }
  enviarPregunta(): void {
    if (!this.pregunta) {
      this.respuesta = 'Por favor, escribe una pregunta antes de enviar.';
      return;
    }

    const requestData = {
      pregunta: this.pregunta,
      room_id: this.selectedRoom.id,
    };

    this.chatbotService.sendQuestion(requestData).subscribe({
      next: (data) => {
        this.respuesta = data.respuesta || 'No se obtuvo respuesta del chatbot.';
      },
      error: (error) => {
        console.error('Error al comunicarse con el chatbot:', error);
        this.respuesta = 'No se pudo conectar al servidor. Por favor, verifica tu conexión.';
      },
    });
  }
  closeChat(): void {
    this.showChat = false;
    this.selectedRoom = null;
    this.pregunta = '';
    this.respuesta = '';
  }
}