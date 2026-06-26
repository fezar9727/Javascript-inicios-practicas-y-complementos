import { Component, inject } from '@angular/core';
import { 
  FormBuilder, 
  FormControl, // CAMBIO: Importamos FormControl para el tipado
  ReactiveFormsModule, 
  Validators 
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
// CAMBIO: Importamos AuthResponse desde nuestra interfaz
import { AuthResponse } from '../../interfaces/user';

// CAMBIO: Definimos la estructura del formulario de login
interface LoginForm {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  cargando: boolean = false;
  error: string = '';
  mensajeExito: string = '';

  // CAMBIO: Aplicamos el tipado fuerte al formulario
  form = this.fb.group<LoginForm>({
    email: this.fb.control('', [Validators.required, Validators.email]),
    password: this.fb.control('', [Validators.required, Validators.minLength(5)])
  });

  iniciarSesion() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.cargando = true;
    this.error = '';
    this.mensajeExito = '';

    const { email, password } = this.form.getRawValue();

    this.authService.login(email!, password!)
      .subscribe({
        next: (response: AuthResponse) => {
          // 1. Log de respuesta del servidor (Verificas qué te llega)
          console.log('Respuesta del servidor:', response);

          // 2. Guardamos y verificamos (Proceso de sesión)
          this.authService.guardarToken(response.token);
          const tokenRecuperado = this.authService.obtenerToken();
          console.log('Token guardado y verificado:', tokenRecuperado);

          this.cargando = false;
          this.mensajeExito = '¡Bienvenido! Redirigiendo...';
          
          setTimeout(() => {
            this.router.navigate(['/tasks']);
          }, 1500);
        },
        error: (error) => {
          // 3. Log de error (Verificas qué salió mal)
          console.error('Error detectado:', error);
          this.cargando = false;
          this.error = error.error?.errors?.[0]?.msg || error.error?.msg || 'Error al iniciar sesión.';
        }
      });
  }
}