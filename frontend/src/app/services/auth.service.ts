import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private api = environment.apiUrl;

  registrar(usuario: User) : Observable<any> {
    return this.http.post(
      `${this.api}/auth/registrar`, 
      usuario);
  }

  login(email: string, password: string) : Observable<any> {
    return this.http.post(
      `${this.api}/auth/login`,
      { email, password }
    )
  }
}