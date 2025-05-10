import { Component, Renderer2 } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { AccesibilityComponent } from "../components/accesibility/accesibility.component";
import { AccessibilityService } from '../service/accesibility.service';
import { Subscription } from 'rxjs';

import { RegisterComponent } from '../components/register/register.component';
import { LoginComponent } from '../components/login/login.component';
import { UserService } from '../service/user.service';
import { LanguageService } from '../service/languageService';
import { HeaderAdminComponent } from '../components/header-admin/header-admin.component';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AccesibilityComponent, RouterModule, HeaderComponent,RegisterComponent, LoginComponent, HeaderAdminComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true
 
})


export class AppComponent {
  
  private contrastSubscription!: Subscription;
  private fontSizeSubscription!: Subscription;
  isModalVisible: boolean = false;
  isLoginModalVisible: boolean = false;
  currentLang: string = 'es';
  title = "frontend";
  isAdminPage = false;
  constructor(private accessibilityService: AccessibilityService, private router: Router, private userService: UserService, public languageService: LanguageService ) {
    this.router.events.subscribe(() => {
      this.isAdminPage = this.router.url.startsWith('/admin'); // Detecta si es admin
    });
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
  ngOnInit() {
    // Suscribirse al cambio de contraste
    this.contrastSubscription = this.accessibilityService.isHighContrast$.subscribe(
      (isHighContrast) => {
        if (isHighContrast) {
          document.body.classList.add('high-contrast');
        } else {
          document.body.classList.remove('high-contrast');
        }
      }
    );

    // Suscribirse al cambio de tamaño de fuente
    this.fontSizeSubscription = this.accessibilityService.fontSize$.subscribe(
      (fontSize) => {
        // Elimina las clases de tamaño de fuente anteriores
        document.body.classList.remove('small-font', 'normal-font', 'large-font');
        document.querySelectorAll('footer').forEach((footer) => {
          footer.classList.remove('small-font', 'normal-font', 'large-font');
        });

        // Aplica la clase correspondiente según el tamaño de fuente
        if (fontSize === 0.75) {
          document.body.classList.add('small-font');
          document.querySelectorAll('footer').forEach((footer) => {
            footer.classList.add('small-font');
          });
        } else if (fontSize === 1) {
          document.body.classList.add('normal-font');
          document.querySelectorAll('footer').forEach((footer) => {
            footer.classList.add('normal-font');
          });
        } else if (fontSize === 1.5) {
          document.body.classList.add('large-font');
          document.querySelectorAll('footer').forEach((footer) => {
            footer.classList.add('large-font');
          });
        }
      }
    );
  }

  ngOnDestroy() {
    // Asegurarse de limpiar las suscripciones
    if (this.contrastSubscription) {
      this.contrastSubscription.unsubscribe();
    }
    if (this.fontSizeSubscription) {
      this.fontSizeSubscription.unsubscribe();
    }
  }
 

}
