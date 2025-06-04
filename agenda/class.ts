export class Class {
    constructor(public name: string, public day: string, public hour: number) { }

   toString(): string {
        return `${this.name} on ${this.day} at ${this.hour}:00`;
    }
}
