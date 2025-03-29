import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { HttpClient, provideHttpClient } from '@angular/common/http';

// Importar TranslateModule y TranslateLoader
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';

// Función para cargar las traducciones
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

// Configuración centralizada de la aplicación
export const appConfig: ApplicationConfig = {
 
  providers: [
      provideZoneChangeDetection({ eventCoalescing: true }),
      provideRouter(appRoutes),

      // Proveedores de Firebase y Auth
      provideAuth(() => getAuth()),
      provideFirebaseApp(() =>
        initializeApp({
          apiKey: "AIzaSyCr4-1WTULL2VRDZiJ_wio5AcuW9bPIf0A",
          authDomain: "hotellexus12.firebaseapp.com",
          databaseURL: "https://hotellexus12-default-rtdb.firebaseio.com",
          projectId: "hotellexus12",
          storageBucket: "hotellexus12.firebasestorage.app",
          messagingSenderId: "21169813601",
          appId: "1:21169813601:web:f96fc07055a83a6d651220"

        })
      ),
      provideDatabase(() => getDatabase()),
      CommonModule,
      ReactiveFormsModule,
      AngularFireDatabase,
      AngularFireAuth,

      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      }).providers!
  ],
};


