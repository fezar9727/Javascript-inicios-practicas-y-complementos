export interface User {
    nombre: string;
    email: string;
    password?: string;
}

export interface AuthResponse {
    token: string;
    user: User;
    msg?: string;
}