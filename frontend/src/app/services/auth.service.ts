import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { User, AuthResponse } from '../interfaces/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private api = environment.apiUrl;
  private authSubject = new BehaviorSubject<boolean>(!!this.obtenerToken());
  authStatus$ = this.authSubject.asObservable();

  registrar(usuario: User): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.api}/auth/registrar`, usuario);
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.api}/auth/login`, { email, password });
  }

  guardarToken(token: string): void {
    sessionStorage.setItem('token', token);
    this.authSubject.next(true); // Emite señal: Usuario logueado
  }

  logout(): void {
    sessionStorage.removeItem('token');
    this.authSubject.next(false); // Emite señal: Usuario fuera
  }

  obtenerToken(): string | null {
    return sessionStorage.getItem('token');
  }

  estaAutenticado(): boolean {
    return this.obtenerToken() !== null;
  }
}

/* A TENER EN CUENTA: 
  Este servicio está completo para realizar las peticiones de registro y login. 
  A futuro, cuando la aplicación crezca, se recomienda implementar Interceptors 
  para manejar automáticamente el envío del token de autenticación en las cabeceras 
  de las peticiones HTTP, evitando repetir esa lógica manualmente en otros servicios.
*/

/**
 * NOTA PARA FUTURA IMPLEMENTACIÓN (ESCALABILIDAD):
 * * Actualmente el método 'login' recibe (email: string, password: string).
 * Para mejorar las buenas prácticas y la escalabilidad, se recomienda usar una 
 * interfaz dedicada como LoginCredentials.
 * * Ventajas:
 * 1. Si el login requiere más campos en el futuro (ej. codigo 2FA), solo cambias 
 * esta interfaz sin romper el contrato del método 'login'.
 * 2. Hace el código más legible al pasar un solo objeto 'credenciales'.
 * * Implementación sugerida:
 * * login(credenciales: LoginCredentials) : Observable<AuthResponse> {
 * return this.http.post<AuthResponse>(`${ this.api }/auth/login`, credenciales);
 * }
 */