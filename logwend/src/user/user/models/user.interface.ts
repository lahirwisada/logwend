export interface User{
    id?: number;
    name?: string;
    username?: string;
    password?: string;
    role?: UserRole;
}

export enum UserRole {
    ADMIN = 'admin',
    OPERATOR = 'operator',
    USER = 'user'
};