import { Class } from './class';
import { Schedule } from './schedule';
import { DayHourIndexFinder } from './helpers';

export class Scheduler {
    private schedule: Schedule;
    private dayHourIndexFinder: DayHourIndexFinder;

    constructor(schedule: Schedule) {
        this.schedule = schedule;
        this.dayHourIndexFinder = new DayHourIndexFinder(this.schedule.matrix);
    }

    bookClass(name: string, day: string, hour: number): boolean {
        const { dayIndex, hourIndex } = this.dayHourIndexFinder.getDayAndHourIndices(day, hour);
        if (dayIndex !== -1 && hourIndex !== -1) {
            const upperName = name.toUpperCase();
            if (this.schedule.matrix[dayIndex][hourIndex] === null) {
                this.schedule.matrix[dayIndex][hourIndex] = new Class(upperName, day.toUpperCase(), hour);
                console.log(`Class "${upperName}" booked on ${day.toUpperCase()} at ${hour}:00.`);
                return true;
            } else {
                console.log(`Error: You already booked a class on ${day.toUpperCase()} at ${hour}:00.`);
            }
        } else {
            console.log(`Error: Invalid day or hour.`);
        }
        return false;
    }

    deleteClass(day: string, hour: number): void {
        const { dayIndex, hourIndex } = this.dayHourIndexFinder.getDayAndHourIndices(day, hour);
        if (dayIndex !== -1 && hourIndex !== -1) {
            const scheduledClass = this.schedule.matrix[dayIndex][hourIndex];
            if (scheduledClass instanceof Class) {
                const className = scheduledClass.name.toLocaleUpperCase();
                this.schedule.matrix[dayIndex][hourIndex] = null;
                console.log(`Class "${className}" deleted from ${day.toUpperCase()} at ${hour}:00.`);
            } else {
                console.log(`Error: No class scheduled on ${day.toUpperCase()} at ${hour}:00.`);
            }
        } else {
            console.log(`Error: Invalid day or hour.`);
        }
    }

    moveClass(dayOrigin: string, hourOrigin: number, dayDestination: string, hourDestination: number): void {
        const { dayIndex: dayIndexOrigin, hourIndex: hourIndexOrigin } = this.dayHourIndexFinder.getDayAndHourIndices(dayOrigin, hourOrigin);
        const { dayIndex: dayIndexDestination, hourIndex: hourIndexDestination } = this.dayHourIndexFinder.getDayAndHourIndices(dayDestination, hourDestination);
        if (dayIndexOrigin !== -1 && hourIndexOrigin !== -1 && dayIndexDestination !== -1 && hourIndexDestination !== -1) {
            const scheduledClass = this.schedule.matrix[dayIndexOrigin][hourIndexOrigin];
            if (scheduledClass instanceof Class) {
                const className = scheduledClass.name.toLocaleUpperCase();
                if (this.schedule.matrix[dayIndexDestination][hourIndexDestination] === null) {
                    this.schedule.matrix[dayIndexDestination][hourIndexDestination] = new Class(className, dayDestination.toUpperCase(), hourDestination);
                    this.schedule.matrix[dayIndexOrigin][hourIndexOrigin] = null;
                    console.log(`Class "${className}" moved from ${dayOrigin.toUpperCase()} at ${hourOrigin}:00 to ${dayDestination.toUpperCase()} at ${hourDestination}:00.`);
                } else {
                    console.log(`ERROR: Cannot move class to ${dayDestination.toUpperCase()} at ${hourDestination}:00. Time slot is already booked.`);
                }
            } else {
                console.log(`Error: No class scheduled on ${dayOrigin.toUpperCase()} at ${hourOrigin}:00.`);
            }
        } else {
            console.log(`Error: Invalid day or hour.`);
        }
    }

    findClassByName(name: string): Class[] | null {
        const upperName = name.toUpperCase();
        const classesFound: Class[] = this.schedule.matrix
            .flatMap(row => row)
            .filter(cls => cls instanceof Class && cls.name === upperName) as Class[];

        if (classesFound.length > 0) {
            console.log(`Classes found for "${upperName}": `);
            classesFound.forEach(cls => {
                console.log(cls.toString());
            });
            return classesFound;
        } else {
            console.log(`No classes found for "${upperName}".`);
            return null;
        }
    }

    findClassByDay(day: string, hour: number): void {
        const { dayIndex, hourIndex } = this.dayHourIndexFinder.getDayAndHourIndices(day, hour);
        if (dayIndex !== -1 && hourIndex !== -1) {
            const scheduledClass = this.schedule.matrix[dayIndex][hourIndex];
            if (scheduledClass instanceof Class) {
                console.log(`Class found: ${scheduledClass.toString()}`);
            } else {
                console.log(`No class scheduled on ${day.toUpperCase()} at ${hour}:00.`);
            }
        } else {
            console.log(`Error: Invalid day or hour.`);
        }
    }
}
