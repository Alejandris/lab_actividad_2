import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {  ReactiveFormsModule} from '@angular/forms';
import { HeaderComponent } from "../../../components/header/header.component";
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../../service/languageService';
import { AccessibilityService } from '../../../service/accesibility.service';
import { Router } from '@angular/router';
import { UserService } from '../../../service/user.service';
import { LoginComponent } from '../../../components/login/login.component';
import { RegisterComponent } from '../../../components/register/register.component';
import { FooterComponent } from "../../../components/footer/footer.component";

@Component({
  selector: 'app-buscador',
  imports: [NgFor, NgIf, ReactiveFormsModule, TranslateModule, FooterComponent],
  templateUrl: './buscador.component.html',
  styleUrl: './buscador.component.css',
  standalone: true,
})
export class BuscadorComponent {
  API_BASE_URL = 'http://127.0.0.1:5000'; // URL del backend
  searchTerm: string = ''; // Palabra clave introducida por el usuario
  scrapedData: any[] = []; // Resultados del scraping
  isLoading: boolean = false; // Indica si la solicitud está procesando
  errorMessage: string = ''; // Mensaje de error

  isModalVisible: boolean = false;
  isLoginModalVisible: boolean = false;
  currentLang : string = 'es';
  constructor(private accessibilityService: AccessibilityService, private router: Router, private userService: UserService, public languageService: LanguageService, private http: HttpClient) {
    // Inicializar el servicio de idioma
    this.languageService.setLanguage(this.currentLang);

  }
 
  openModal() {
    this.isModalVisible = true;
  }
  openLoginModal() {
    this.isLoginModalVisible = true;
  }
  onChange(event: Event) {
    const lang = (event.target as HTMLSelectElement).value;
    this.languageService.setLanguage(lang);
  }

  handleInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchTerm = inputElement.value;
    console.log('Palabra clave actualizada:', this.searchTerm);
  }

  handleFormSubmission(): void {
    this.isLoading = true;
    this.errorMessage = '';

    if (!this.searchTerm.trim()) {
      this.errorMessage = 'Por favor, introduce una palabra clave válida.';
      this.isLoading = false;
      return;
    }

    this.http.post<any>('http://127.0.0.1:5000/api/scrape', {
      keyword: this.searchTerm, // Pasar la palabra clave
      pages: 1 // Número de páginas a buscar
    }).subscribe({
      next: (response) => {
        this.scrapedData = response.results || [];
        if (this.scrapedData.length === 0) {
          this.errorMessage = 'No se encontraron resultados relevantes.';
        }
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Hubo un problema al intentar conectar con el servidor.';
        this.isLoading = false;
      }
    });
  }
}