export default class User {
    // private
    private _name: string;
    private _email: string;

    constructor(name: string, email: string) {
        this.name = name;
        this.email = email;
    }

    set name(name: string) {
        this._name = name;
    }
    get name(): string{
        return this._name;
    }

    set email(email: string) {
        this._email = email;
    }
    get email(): string{
        return this._email;
    }

}