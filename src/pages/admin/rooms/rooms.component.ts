import { Component, OnInit } from '@angular/core';
import { RoomserService } from '../../../service/roomser.service';
import { NgFor, NgIf } from '@angular/common';
import { HeaderAdminComponent } from "../../../components/header-admin/header-admin.component";

@Component({
  selector: 'app-rooms',
  imports: [NgFor, NgIf, HeaderAdminComponent],
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],  // Corregido: 'styleUrls' en lugar de 'styleUrl'
  standalone: true
})
export class RoomsComponent implements OnInit {
  rooms: any[] = [];
  newRoom = { name_room: '', id_type_room: 0, floor: 0, description: '', status_room: '', image: '' };

  constructor(private roomserService: RoomserService) {}

  ngOnInit(): void {
    this.loadRooms();  // Llamada a cargar habitaciones al inicio
  }

  // Cargar habitaciones desde el servidor
  loadRooms(): void {
    this.roomserService.getrooms().subscribe(
      (data) => {
        if (Array.isArray(data)) {
          this.rooms = data; // Asignar datos si son un array
        } else {
          console.error('El backend no devolvió un array:', data);
        }
      },
      (error) => {
        console.error('Error al cargar las habitaciones:', error); // Manejo de errores
      }
    );
  }

  // Manejar el cambio de archivo de imagen
  handleFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const maxSize = 5 * 1024 * 1024; // 5 MB
      if (file.size > maxSize) {
        alert('El archivo es demasiado grande. El tamaño máximo permitido es 5 MB.');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result?.toString().split(',')[1] || '';
        this.newRoom.image = base64String;
      };
      reader.readAsDataURL(file); // Leemos el archivo como DataURL
    } else {
      this.newRoom.image = ''; // Limpiar si no se selecciona archivo
    }
  }

  // Método para manejar el envío del formulario
  onSubmit(event: Event): void {
    event.preventDefault(); // Evita la recarga de la página
    const target = event.target as HTMLFormElement;

    const name = (target.querySelector('#name') as HTMLInputElement).value;
    const type = parseInt((target.querySelector('#type') as HTMLInputElement).value, 10);
    const floor = parseInt((target.querySelector('#floor') as HTMLInputElement).value, 10);
    const description = (target.querySelector('#description') as HTMLInputElement).value;
    const status = (target.querySelector('#status') as HTMLInputElement).value;

    const newRoom = {
      name_room: name,
      id_type_room: type,
      floor: floor,
      description: description,
      status_room: status,
      image: this.newRoom.image
    };

    this.roomserService.insertroom(newRoom).subscribe(
      (response) => {
        console.log('Habitación creada con éxito:', response);
        this.loadRooms(); // Recargar habitaciones
      },
      (error) => {
        console.error('Error al crear habitación:', error); // Manejo de errores
      }
    );

    target.reset();  // Limpiar formulario
    this.newRoom.image = '';  // Limpiar imagen
  }
}
