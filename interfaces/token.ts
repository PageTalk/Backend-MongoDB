import { Role } from "../enums/role";

export interface Token {
    id: number;
    username: string;
    email: string;
    role: Role;
}
