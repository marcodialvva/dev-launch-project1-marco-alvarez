import { FindClassByDayResult } from './helpers';

export class Class {
    constructor(public name: string, public day: string, public hour: number) { }
}

export interface IAgenda {
    bookClass(name: string, day: string, hour: number): string;
    deleteClass(day: string, hour: number): string;
    moveClass(dayOrigin: string, hourOrigin: number, dayDestination: string, hourDestination: number): string;
    findClassByName(name: string): FindClassByDayResult | null;
    findClassByDay(day: string, hour: number): FindClassByDayResult | null;

}