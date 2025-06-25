import { Class } from './class';


const NUMBER_OF_DAYS = 6;
const NUMBER_OF_HOURS = 10;

export class Schedule {
    matrix: (Class | null | string)[][];
    daysOfTheWeek: number;
    hoursOfTheDay: number;

    constructor(days: number = NUMBER_OF_DAYS, hours: number = NUMBER_OF_HOURS) {
        this.daysOfTheWeek = days;
        this.hoursOfTheDay = hours;
        this.matrix = Array.from({ length: days + 1 }, () => Array(hours + 1).fill(null));
        this.initializeSchedule();
    }

    private initializeSchedule() {
        const today = new Date();
        const dayOfWeek = today.getDay();
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - dayOfWeek + 1);

        const weekDays: string[] = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
        for (let i = 1; i < this.matrix.length; i++) {
            const currentDay = new Date(startOfWeek);
            currentDay.setDate(startOfWeek.getDate() + (i - 1));
            this.matrix[i][0] = `${weekDays[i - 1]} ${currentDay.getDate()} ${currentDay.toLocaleString('default', { month: 'long' })}`;
        }
        for (let j = 1; j <= this.hoursOfTheDay; j++) {
            this.matrix[0][j] = `${j + 6}:00`;
        }
    }
}
