export interface Task {
  _id?: string;
  titulo: string;
  completado: boolean; // Usamos 'completado' (sin a) como en Mongo
  usuario?: string;
  descripcion?: string; // Aquí va el detalle de en qué consiste la tarea
}

export interface TaskResponse {
  ok: boolean;
  tasks: Task[]; // Esta es la estructura que espera tu suscripción
}