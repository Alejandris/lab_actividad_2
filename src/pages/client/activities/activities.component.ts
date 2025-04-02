import { Component } from '@angular/core';
import { HeaderComponent } from '../../../components/header/header.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterComponent } from '../../../components/register/register.component';
import { LoginComponent } from "../../../components/login/login.component";
import { TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';
import { LanguageService } from '../../../service/languageService';
import { AccessibilityService } from '../../../service/accesibility.service';
import { Router } from '@angular/router';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-activities',
  imports: [RegisterComponent, LoginComponent, TranslateModule, FooterComponent],
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
  onChange(event: Event) {
    const lang = (event.target as HTMLSelectElement).value;
    this.languageService.setLanguage(lang);
  }
  constructor(private accessibilityService: AccessibilityService, private router: Router, private userService: UserService, public languageService: LanguageService ) {

  }

  
}
