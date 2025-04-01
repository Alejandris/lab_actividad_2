import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, Renderer2 } from '@angular/core';
import { TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';
import { LanguageService } from '../../service/languageService';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [TranslateModule, CommonModule, RouterOutlet],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  standalone: true
})
export class HeaderComponent {
  
  
  @Output() registerClicked = new EventEmitter<void>();

  onRegisterClick() {
    this.registerClicked.emit();
  }
  @Output() loginClicked = new EventEmitter<void>();  // Emitimos un evento cuando se haga clic

  onLoginClick() {
    this.loginClicked.emit();  // Emitimos el evento para que el componente padre (Home) abra el modal
  }
  
  options: Array<{ value: string; display: string }> = [];
  
  constructor(public languageService: LanguageService) { }

  ngOnInit() {
    // Inicializa las opciones después de que el servicio esté listo
    this.options = this.languageService.getOptions();
  }

  onChange(event: Event) {
    const lang = (event.target as HTMLSelectElement).value;
    this.languageService.setLanguage(lang); // Cambia el idioma globalmente
  }
  

}


