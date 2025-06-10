
import { Class } from './class';
import { Schedule } from './schedule';
import { DayHourIndexFinder } from './helpers';
import { FindClassResult } from './helpers'
import { Printer } from '../pinter/printer';
import { FindClassByDayResult } from './helpers';


export class Scheduler {
    private schedule: Schedule;
    private dayHourIndexFinder: DayHourIndexFinder;
    private printer: Printer;

    constructor(schedule: Schedule) {
        this.schedule = schedule;
        this.dayHourIndexFinder = new DayHourIndexFinder(this.schedule.matrix);
        this.printer = new Printer(this.schedule);
    }

    bookClass(name: string, day: string, hour: number): string {
        const { dayIndex, hourIndex } = this.dayHourIndexFinder.getDayAndHourIndices(day, hour);
        if (dayIndex !== -1 && hourIndex !== -1) {
            const upperName = name.toUpperCase();
            if (this.schedule.matrix[dayIndex][hourIndex] === null) {
                this.schedule.matrix[dayIndex][hourIndex] = new Class(upperName, day.toUpperCase(), hour);
                return `Class "${upperName}" booked on ${day.toUpperCase()} at ${hour}:00.`;
            } else {
                return `Error: You already booked a class on ${day.toUpperCase()} at ${hour}:00.`;
            }
        } else {
            return `Error: Invalid day or hour.`;
        }
    }

    deleteClass(day: string, hour: number): string {
        const { dayIndex, hourIndex } = this.dayHourIndexFinder.getDayAndHourIndices(day, hour);
        if (dayIndex !== -1 && hourIndex !== -1) {
            const scheduledClass = this.schedule.matrix[dayIndex][hourIndex];
            if (scheduledClass instanceof Class) {
                const className = scheduledClass.name.toLocaleUpperCase();
                this.schedule.matrix[dayIndex][hourIndex] = null;
                return `Class "${className}" deleted from ${day.toUpperCase()} at ${hour}:00.`;
            } else {
                return `Error: No class scheduled on ${day.toUpperCase()} at ${hour}:00.`;
            }
        } else {
            return `Error: Invalid day or hour.`;
        }
    }

    moveClass(dayOrigin: string, hourOrigin: number, dayDestination: string, hourDestination: number): string {
        const { dayIndex: dayIndexOrigin, hourIndex: hourIndexOrigin } = this.dayHourIndexFinder.getDayAndHourIndices(dayOrigin, hourOrigin);
        const { dayIndex: dayIndexDestination, hourIndex: hourIndexDestination } = this.dayHourIndexFinder.getDayAndHourIndices(dayDestination, hourDestination);
        if (dayIndexOrigin !== -1 && hourIndexOrigin !== -1 && dayIndexDestination !== -1 && hourIndexDestination !== -1) {
            const scheduledClass = this.schedule.matrix[dayIndexOrigin][hourIndexOrigin];
            if (scheduledClass instanceof Class) {
                const className = scheduledClass.name.toLocaleUpperCase();
                if (this.schedule.matrix[dayIndexDestination][hourIndexDestination] === null) {
                    this.schedule.matrix[dayIndexDestination][hourIndexDestination] = new Class(className, dayDestination.toUpperCase(), hourDestination);
                    this.schedule.matrix[dayIndexOrigin][hourIndexOrigin] = null;
                    return `Class "${className}" moved from ${dayOrigin.toUpperCase()} at ${hourOrigin}:00 to ${dayDestination.toUpperCase()} at ${hourDestination}:00.`;
                } else {
                    return `ERROR: Cannot move class to ${dayDestination.toUpperCase()} at ${hourDestination}:00. Time slot is already booked.`;
                }
            } else {
                return `Error: No class scheduled on ${dayOrigin.toUpperCase()} at ${hourOrigin}:00.`;
            }
        } else {
            return `Error: Invalid day or hour.`;
        }
    }


    findClassByName(name: string): FindClassResult {
        const upperName = name.toUpperCase();
        const classesFound: Class[] = this.schedule.matrix
            .flatMap(row => row)
            .filter(cls => cls instanceof Class && cls.name === upperName) as Class[];

        if (classesFound.length > 0) {
            return { classes: classesFound };
        } else {
            return { message: `No classes found under the name: ${upperName}` };
        }
    }


    findClassByDay(day: string, hour: number): FindClassByDayResult {
        const { dayIndex, hourIndex } = this.dayHourIndexFinder.getDayAndHourIndices(day, hour);
        if (dayIndex !== -1 && hourIndex !== -1) {
            const scheduledClass = this.schedule.matrix[dayIndex][hourIndex];
            if (scheduledClass instanceof Class) {
                return scheduledClass as FindClassByDayResult;
            } else {
                return { message: `No class scheduled on ${day.toUpperCase()} at ${hour}:00.` };
            }
        } else {
            return { message: `Error: Invalid day or hour.` };
        }
    }

    public printSchedule(): void {
        this.printer.print();
    }
}
