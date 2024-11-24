import { Role } from "./role";
import { Buy } from './buy'

export class User {
    id?: string;
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    role: Role;
    token?: string;
    listBuys: Buy[];

    constructor(
        id?: string,
        email?: string,
        password?: string,
        firstName?: string,
        lastName?: string,
        role: Role = Role.User,
        token?: string,
    ) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
        this.token = token;
        this.listBuys = [];
    }

    setEmail(email: string) {
        this.email = email;
    }

    setFirstName(firstName: string) {
        this.firstName = firstName;
    }

    setLastName(lastName: string) {
        this.lastName = lastName;
    }

    addBuy(buy: Buy) {
        this.listBuys.push(buy);
      }

    getBuys(): Buy[] {
        return [...this.listBuys]; // Devuelve una copia del array para evitar modificaciones accidentales
    }

}
