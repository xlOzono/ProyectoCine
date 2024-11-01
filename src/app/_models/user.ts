import { Role } from "./role";

export class User {
    id?: string;
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    role: Role
    token?: string;

    constructor(
        id?: string,
        email?: string,
        password?: string,
        firstName?: string,
        lastName?: string,
        role: Role = Role.User, 
        token?: string
    ) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
        this.token = token;
    }
}