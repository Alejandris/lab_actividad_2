import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterComponent } from '../../components/register/register.component';
import { LoginComponent } from "../../components/login/login.component";
import { TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';
import { LanguageService } from '../../service/languageService';

@Component({
  selector: 'app-activities',
  imports: [HeaderComponent, FooterComponent, RegisterComponent, LoginComponent, TranslateModule],
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.css',
  standalone: true,
  providers: [TranslateService]
})
export class ActivitiesComponent {
  isModalVisible: boolean = false;
  isLoginModalVisible: boolean = false;
  currentLang : string = 'es';

  // Método que se llama cuando el header emite el evento de "registrarse"
  openModal() {
    this.isModalVisible = true;
  }
  openLoginModal() {
    this.isLoginModalVisible = true;
  }

  constructor(public languageService: LanguageService) { }

  onChange(event: Event) {
    const lang = (event.target as HTMLSelectElement).value;
    this.languageService.setLanguage(lang);
  }
}
