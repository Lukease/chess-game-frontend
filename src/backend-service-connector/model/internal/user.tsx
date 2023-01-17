export class User {
    private id: number | undefined
    private login: string
    private password: string
    private email: string | undefined


    constructor(id: number | undefined, login: string, password: string, email: string | undefined) {
        this.id = id;
        this.login = login;
        this.password = password;
        this.email = email;
    }


    getId(): number | undefined {
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

    getEmail(): string | undefined {
        return this.email;
    }

    setEmail(value: string) {
        this.email = value;
    }
}