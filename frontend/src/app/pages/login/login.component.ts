import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  cargando: boolean = false;
  error: string = '';

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5)]]
  });

  login() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.cargando = true;
    this.error = ''; // Limpiamos errores previos antes de intentar conectar

    this.authService
      .login(this.form.value.email!, this.form.value.password!)
      .subscribe({
        next: (response) => {
          this.cargando = false;
          localStorage.setItem('token', response.token);
          this.router.navigate(['/tasks']);
        },
        error: (err) => {
          this.cargando = false;
          this.error = err.error?.errors?.[0]?.msg || err.error?.msg || 'Error al iniciar sesión.';
        }
      });
  }
}