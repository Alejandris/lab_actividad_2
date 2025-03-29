import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { get, getDatabase, ref } from '@angular/fire/database';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class LoginComponent {
  @Input() isModalVisible: boolean = false;  // Recibimos la visibilidad del modal desde el componente padre (Home)
  formLogin: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,  // Inyectamos el servicio de usuario
    private router: Router  // Para redirigir después de un inicio de sesión exitoso
  ) {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  // Método que se llama cuando se envía el formulario de login
  onSubmit() {
    if (this.formLogin.valid) {
      console.log("Formulario de login enviado:", this.formLogin.value);

      // Llamamos al servicio de login con los datos del formulario
      this.userService.login(this.formLogin.value).then((userCredential) => {
        console.log('Usuario logueado exitosamente:', userCredential);
        const userId = userCredential.user?.uid;

      if (userId) {
        const db = getDatabase();
        const userRef = ref(db, `users/${userId}`);

        get(userRef).then((snapshot) => {
          if (snapshot.exists()) {
            const userData = snapshot.val();
            console.log('Datos del usuario:', userData);

            if (userData.role === 'admin') {
              console.log('Usuario autenticado como administrador');
              this.router.navigate(['/rooms']);
              this.closeModal(); // Redirige a la pantalla de administrador
            } else {
              console.log('Usuario autenticado como usuario normal');
              this.router.navigate(['/Home']); 
              this.closeModal();// Redirige a la pantalla principal
            }

            this.closeModal(); // Cierra el modal si es necesario
          } else {
            console.error("No se encontraron datos para el usuario.");
          }
        }).catch(error => {
          console.error("Error al obtener datos del usuario:", error);
        });
      }
    }).catch(error => {
      console.error("Error al iniciar sesión:", error);
    });
  }
}
        // Redirigimos a la página de inicio o donde sea necesari
  // Método para cerrar el modal
  closeModal() {
    this.isModalVisible = false;
  }

  // Método para iniciar sesión con Google
  onClick() {
    this.userService.loginWithGoogle().then((userCredential) => {
      console.log('Usuario logueado con Google:', userCredential);
      this.router.navigate(['/Home']);
      this.closeModal();  // Cierra el modal después del login
    }).catch(error => {
      console.error("Error al iniciar sesión con Google:", error);
    });
  }
}