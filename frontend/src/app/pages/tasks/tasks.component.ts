import { Component, inject, OnInit, OnDestroy } from '@angular/core'; // 1. Agregué OnDestroy
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { Task, TaskResponse } from '../../interfaces/task';
import { Subject, takeUntil } from 'rxjs'; // 2. Para gestionar memoria
import Swal from 'sweetalert2';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit, OnDestroy {
  private readonly taskService = inject(TaskService);
  private readonly fb = inject(FormBuilder);
  private readonly destroy$ = new Subject<void>(); // 3. Canal para destruir suscripciones

  public tasks: Task[] = [];
  public cargando: boolean = true;
  public mostrarFormulario: boolean = false;
  public tareaExpandidaId: string | null = null;
  // Agrega esto debajo de tus variables:
  public taskForm: FormGroup = this.fb.group({
    titulo: ['', [Validators.required, Validators.minLength(3)]]
  });

  ngOnInit(): void {
    this.cargarTareas();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public toggleDetalles(id: string | undefined): void {
    if (!id) return;
    this.tareaExpandidaId = (this.tareaExpandidaId === id) ? null : id;
  }

  public alternarFormulario(): void {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  public marcarCompletado(tarea: Task): void {
    if (!tarea._id) return;
    const nuevoEstado = !tarea.completado;
    
    // 4. Usamos pipe y takeUntil para evitar memory leaks
    this.taskService.actualizarTarea(tarea._id, { completado: nuevoEstado })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => tarea.completado = nuevoEstado,
        error: (err) => console.error('Error al actualizar:', err)
      });
  }

  // --- PÉGALO AQUÍ ---
  public eliminarTarea(id: string | undefined): void {
    if (!id) return;

    this.taskService.eliminarTarea(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.tasks = this.tasks.filter(t => t._id !== id);
          this.mostrarToast('success', 'Tarea eliminada');
        },
        error: (err) => {
          console.error('❌ Error al eliminar:', err);
          this.mostrarToast('error', 'No se pudo eliminar la tarea');
        }
      });
  }
 

  public crearNuevaTarea(): void {
  // Validamos el estado del formulario antes de tocar el servicio
  if (this.taskForm.invalid) {
    this.taskForm.markAllAsTouched(); // Marca los campos como tocados para mostrar errores si los hay
    this.mostrarToast('error', 'El título debe tener al menos 3 caracteres');
    return;
  }

  this.cargando = true;
  const nuevaTarea: Task = {
    titulo: this.taskForm.value.titulo,
    completado: false
  };

  this.taskService.crearTarea(nuevaTarea)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (tareaCreada: Task) => {
        this.tasks = [...this.tasks, tareaCreada];
        this.taskForm.reset(); // Limpieza profesional post-envío
        this.mostrarFormulario = false;
        this.cargando = false;
        this.mostrarToast('success', 'Tarea creada correctamente');
      },
      error: (error) => {
        this.cargando = false;
        console.error('❌ Error al crear tarea:', error);
        this.mostrarToast('error', 'No se pudo crear la tarea');
      }
    });
}

  private cargarTareas(): void {
    this.cargando = true;
    this.taskService.obtenerTareas()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: TaskResponse) => {
          
          console.log('📋 Respuesta recibida del backend:', res);
          console.log('📋 Cantidad de tareas cargadas:', res.tasks?.length);

          this.tasks = res.tasks || [];
          this.cargando = false;
        },
        error: (err) => {

          // TODO: Implementar AuthGuard en las rutas para evitar el error 401 
          // que ocurre cuando el componente se carga antes de que el token 
          // esté disponible en el sessionStorage.

          console.error('❌ Error al cargar tareas desde el backend:', err);
          this.tasks = [];
          this.cargando = false;
        }
      });
  }
  public calcularPorcentaje(): number {
    if (this.tasks.length === 0) return 0;
    const completadas = this.tasks.filter(t => t.completado).length;
    return Math.round((completadas / this.tasks.length) * 100);
  }

  
  private mostrarToast(icon: 'success' | 'error', title: string): void {
    Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true
    }).fire({ icon, title });
  }
} 
