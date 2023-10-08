import { Role } from "../enums/role";

export interface Token {
    username: string;
    email: string;
    role: Role;
}
