export class User {
    private id: number
    private login: string
    private password: string
    private email: string


    constructor(id: number, login: string, password: string, email: string) {
        this.id = id;
        this.login = login;
        this.password = password;
        this.email = email;
    }


    getId(): number {
        return this.id;
    }

    setId(value: number) {
        this.id = value;
    }

    getLogin(): string {
        return this.login;
    }

    setLogin(value: string) {
        this.login = value;
    }

    getPassword(): string {
        return this.password;
    }

    setPassword(value: string) {
        this.password = value;
    }

    getEmail(): string {
        return this.email;
    }

    setEmail(value: string) {
        this.email = value;
    }
}