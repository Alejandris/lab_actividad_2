import { Component, Renderer2 } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { AccesibilityComponent } from "../components/accesibility/accesibility.component";
import { AccessibilityService } from '../service/accesibility.service';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { appRoutes } from './app.routes';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AccesibilityComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true
 
})


export class AppComponent {
  
  private contrastSubscription!: Subscription;
  private fontSizeSubscription!: Subscription;
  title = "frontend";
  constructor(private accessibilityService: AccessibilityService, private router: Router) {

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
