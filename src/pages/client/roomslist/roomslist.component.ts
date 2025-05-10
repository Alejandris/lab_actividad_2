import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';



import { RoomserService } from '../../../service/roomser.service';
import { ChatbotService } from '../../../service/chatbot.service';
import { HeaderComponent } from '../../../components/header/header.component';
import { UserService } from '../../../service/user.service';
import { LanguageService } from '../../../service/languageService';
import { RegisterComponent } from "../../../components/register/register.component";
import { LoginComponent } from "../../../components/login/login.component";



@Component({
  selector: 'app-roomslist',
  imports: [NgFor, NgIf, RegisterComponent, LoginComponent],
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

  constructor(private http: HttpClient, private roomserService : RoomserService, private chatbotService : ChatbotService, private userService : UserService , private languageService: LanguageService){}
  isModalVisible: boolean = false;
  isLoginModalVisible: boolean = false;
  currentLang : string ='es';

  // Método que se llama cuando el header emite el evento de "registrarse"
  openModal() {
    this.isModalVisible = true;
  }
  openLoginModal() {
    this.isLoginModalVisible = true;
  }

  ngOnInit(): void {
    this.loadRooms();  // Llamada a cargar habitaciones al inicio
  }
  onChange(event: Event) {
    const lang = (event.target as HTMLSelectElement).value;
    this.languageService.setLanguage(lang);
  }
  // Cargar habitaciones desde el servidor
  loadRooms(): void {
    this.roomserService.getrooms().subscribe(
      (data: any) => {
        console.log("Datos recibidos:", data);
        if (Array.isArray(data)&& data.length > 0 && data[0].id_room) {
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

  handleChat(room_id: any): void {
    this.selectedRoom = room_id;
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
    console.log('selectedRoom:', this.selectedRoom);
    console.log('selectedRoom.id_room:', this.selectedRoom?.id_room);

    if (!this.selectedRoom?.id_room) {
      console.error("El ID de la habitación no está definido.");
      this.respuesta = "No se pudo obtener el ID de la habitación. Verifica la selección.";
      return;
    }
    

    const requestData = {
      pregunta: this.pregunta,
      room_id: this.selectedRoom.id_room,
    };
    if (!requestData.room_id) {
      console.error("Error: ID de habitación no definido.");
      this.respuesta = "No se encontró el ID de la habitación.";
      return;
    }
    console.log("Enviando datos al chatbot:", requestData);
    // Llamar al servicio para enviar la pregunta
    this.chatbotService.sendQuestion(requestData).subscribe({
      next: (data) => {
        console.log("Respuesta del servidor:", data);
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