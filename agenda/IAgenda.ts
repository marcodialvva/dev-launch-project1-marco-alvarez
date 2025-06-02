export class Class {
    constructor(public name: string, public day: string, public hour: number) { }
}

export interface IAgenda {
    bookClass(name: string, day: string, hour: number): void;
    deleteClass(day: string, hour: number): void;
    moveClass(dayOrigin: string, hourOrigin: number, dayDestination: string, hourDestination: number): void;
    findClassByName(name: string): (Class[] | null);
    findClassByDay(day: string, hour: number): void;
    printSchedule(): void;
}