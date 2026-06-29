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

  // MUEVE ESTO AQUÍ: Método centralizado para los toasts
  private mostrarToast(icon: 'success' | 'error', title: string): void {
    Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: icon === 'success' ? 3000 : 4000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    }).fire({ icon, title });
  }

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
          
          // USO REEMPLAZADO AQUÍ
          this.mostrarToast('success', 'Sesión iniciada correctamente');
          this.router.navigate(['/tasks']);
        },
        error: (error) => {
          this.cargando = false;
          
          // USO REEMPLAZADO AQUÍ
          const mensajeError = error.error?.errors?.[0]?.msg || error.error?.msg || 'Error al iniciar sesión.';
          this.mostrarToast('error', mensajeError);
        }
      });
  }
}