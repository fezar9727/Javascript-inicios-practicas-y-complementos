export interface Task {
    _id?: string;
    titulo: string;
    usuario?: string;
}

export interface TaskResponse {
    ok: boolean;
    tasks: Task[];
}