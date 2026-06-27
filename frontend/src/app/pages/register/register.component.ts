import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User, AuthResponse } from '../../interfaces/user';
import Swal from 'sweetalert2'; 

interface RegisterForm {
  nombre: FormControl<string | null>;
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  cargando: boolean = false;
  passwordVisible: boolean = false; 

  form = this.fb.group<RegisterForm>({
    nombre: this.fb.control('', [Validators.required, Validators.minLength(3)]),
    email: this.fb.control('', [Validators.required, Validators.email]),
    password: this.fb.control('', [Validators.required, Validators.minLength(5)])
  });

  
  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  private getRawValue(): User {
    return this.form.getRawValue() as User;
  }


  registrar() {
    if(this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.cargando = true;
    const userData = this.getRawValue();

    this.authService.registrar(userData)
        .subscribe({
          next: (response: AuthResponse) => {
            this.cargando = false;

            
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              }
            });

            Toast.fire({
              icon: 'success',
              title: 'Usuario registrado correctamente'
            }).then(() => {
              this.router.navigate(['/login']);
            });
          },
          error: (error) => {
            this.cargando = false;
            
            
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 4000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              }
            });

            const mensajeError = error.error?.errors?.[0]?.msg || error.error?.msg || 'Error al registrar el usuario.';
            
            Toast.fire({
              icon: 'error',
              title: mensajeError
            });
          }
        });
  }
}