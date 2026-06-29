import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { Task, TaskResponse } from '../interfaces/task';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private http = inject(HttpClient);
  private api = `${environment.apiUrl}/task`; 

  private obtenerHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  public obtenerTareas(): Observable<TaskResponse> { 
    return this.http.get<TaskResponse>(this.api, { headers: this.obtenerHeaders() });
  }

  public actualizarTarea(id: string, data: { completado: boolean }): Observable<Task> {
    return this.http.put<Task>(`${this.api}/${id}`, data, { headers: this.obtenerHeaders() });
  }

  // ESTO es lo único que debe tener el servicio relacionado a crear
  public crearTarea(data: Task): Observable<Task> {
    return this.http.post<Task>(this.api, data, { headers: this.obtenerHeaders() });
  }

  public eliminarTarea(id: string): Observable<void> {
  return this.http.delete<void>(`${this.api}/${id}`, { headers: this.obtenerHeaders() });
}
}