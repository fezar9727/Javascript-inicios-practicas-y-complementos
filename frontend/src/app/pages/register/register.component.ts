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
// CAMBIO: Importamos AuthResponse
import { User, AuthResponse } from '../../interfaces/user';

// CAMBIO: Definimos la estructura del formulario para tipado fuerte
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
  error: string = '';

  // CAMBIO: Aplicamos tipado fuerte al FormGroup
  form = this.fb.group<RegisterForm>({
    nombre: this.fb.control('', [Validators.required, Validators.minLength(3)]),
    email: this.fb.control('', [Validators.required, Validators.email]),
    password: this.fb.control('', [Validators.required, Validators.minLength(5)])
  });

  // CAMBIO: Método seguro para extraer datos
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
            // 1. Log de éxito
            console.log('Usuario registrado con éxito:', response);

            // 2. Si tu API devuelve token al registrar, descomenta estas líneas:
            // this.authService.guardarToken(response.token);
            
            this.cargando = false;
            alert('Usuario registrado correctamente.');
            this.router.navigate(['/login']);
          },
          error: (error) => {
            // 3. Log de error (el estándar que definimos)
            console.error('Error al registrar usuario:', error);
            this.cargando = false;
            this.error = error.error?.errors?.[0]?.msg || error.error?.msg || 'Error al registrar el usuario.';
          }
        });
  }
}