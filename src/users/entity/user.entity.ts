export enum UserRole {
    ADMIN = 'admin',
    TEACHER = 'teacher',
    STUDENT = 'student',
}

export class User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: UserRole;
}
  