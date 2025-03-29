import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';  // Asegúrate de que esta importación esté correcta
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { or } from '@angular/fire/firestore';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class RegisterComponent {
  @Input() isModalVisible: boolean = false; // Recibimos el valor desde el componente padre (Home)
  formReg: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,  // Inyectamos el servicio
    private router: Router  // Para redirigir a la página después de un registro exitoso
  ) {
    this.formReg = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['admin', Validators.required]  // Agregamos el rol al formulario
    });
  }

  // Este método se llama cuando se envía el formulario
  onSubmit() {
    if (this.formReg.valid) {
      const userData ={...this.formReg.value, role:'admin'}; // Agregamos el rol al usuario
      console.log("Formulario enviado:",userData);

      // Llamamos al servicio de registro con los datos del formulario
      this.userService.register(userData).then((userCredential) => {
        console.log('Usuario registrado exitosamente:', userCredential);

        // Después de registrar, redirigimos al usuario o cerramos el modal
        this.router.navigate(['/home']);  // Redirige a la página de inicio, por ejemplo
        this.closeModal();  // Cierra el modal si es necesario
      }).catch(error => {
        console.error("Error al registrar usuario:", error);
      });
    }
  }

  closeModal() {
    this.isModalVisible = false;
  }
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
