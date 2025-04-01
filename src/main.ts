/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';  // Asegúrate de que este componente esté importado
import { appConfig } from './app/app.config';  // Configuración de rutas
import { provideRouter } from '@angular/router';
import { appRoutes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { HeaderComponent } from './components/header/header.component';
import { AccesibilityComponent } from './components/accesibility/accesibility.component';

bootstrapApplication(AppComponent,{
  providers:[
    ...appConfig.providers,
    provideHttpClient(),
    provideRouter(appRoutes), provideFirebaseApp(() => initializeApp({ projectId: "hotellexus12", appId: "1:21169813601:web:f96fc07055a83a6d651220", databaseURL: "https://hotellexus12-default-rtdb.firebaseio.com", storageBucket: "hotellexus12.firebasestorage.app", apiKey: "AIzaSyCr4-1WTULL2VRDZiJ_wio5AcuW9bPIf0A", authDomain: "hotellexus12.firebaseapp.com", messagingSenderId: "21169813601" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase()),
    AccesibilityComponent,
  ]
})
  .catch(err => console.error(err));
  


