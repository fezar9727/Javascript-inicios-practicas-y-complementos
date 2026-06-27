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
import { AuthResponse } from '../../interfaces/user';
import Swal from 'sweetalert2'; 

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
  passwordVisible: boolean = false;

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }
  

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
    const { email, password } = this.form.getRawValue();

    this.authService.login(email!, password!)
      .subscribe({
        next: (response: AuthResponse) => {
          this.authService.guardarToken(response.token);
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
            title: 'Sesión iniciada correctamente'
          }).then(() => {
            this.router.navigate(['/tasks']);
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

          
          const mensajeError = error.error?.errors?.[0]?.msg || error.error?.msg || 'Error al iniciar sesión.';
          
          Toast.fire({
            icon: 'error',
            title: mensajeError
          });
        }
      });
  }
}