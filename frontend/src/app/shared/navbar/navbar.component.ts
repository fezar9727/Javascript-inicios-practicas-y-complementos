import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true, // standalone permite que este componente gestione sus propias dependencias,
                    // facilitando la reutilización y eliminando la necesidad de módulos pesados.
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  // Inyección de dependencias moderna
  private authService = inject(AuthService);
  private router = inject(Router);

  // Exponemos el estado directamente del servicio. 
  // El pipe | async en el HTML se encargará de la suscripción.
  isLoggedIn$ = this.authService.authStatus$;

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}