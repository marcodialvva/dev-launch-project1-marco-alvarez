import { DayHourIndexFinder } from './helpers'
import { IAgenda } from './IAgenda'
class Class {
    constructor(public name: string, public day: string, public hour: number) { }
}

const daysOfTheWeek = 6;
const hoursOfTheDay = 10;

class Agenda implements IAgenda {
    matrix: (Class | null | string)[][];
    dayHourIndexFinder: DayHourIndexFinder;

    constructor(days: number = daysOfTheWeek, hours: number = hoursOfTheDay) {
        this.matrix = Array.from({ length: days + 1 }, () => Array(hours + 1).fill(null));
        this.dayHourIndexFinder = new DayHourIndexFinder(this.matrix);

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
        for (let j = 1; j <= hours; j++) {
            this.matrix[0][j] = `${daysOfTheWeek + j}:00`;
        }
    }

    bookClass(name: string, day: string, hour: number): void {
        const { dayIndex, hourIndex } = this.dayHourIndexFinder.getDayAndHourIndices(day, hour);

        if (dayIndex !== -1 && hourIndex !== -1) {
            const upperName = name.toUpperCase();

            if (this.matrix[dayIndex][hourIndex] === null) {
                this.matrix[dayIndex][hourIndex] = new Class(upperName, day.toUpperCase(), hour);
                console.log(`Class "${upperName}" booked on ${day.toUpperCase()} at ${hour}:00.`);
                
            } else {
                console.log(`Error: You already booked a class on ${day.toUpperCase()} at ${hour}:00.`);
            }
        } else {
            console.log(`Error: Invalid day or hour. Please remember that classes can be scheduled from Monday to Saturday, between 7:00 and 16:00.`);
        }
      
    }

    deleteClass(day: string, hour: number): void {
        const { dayIndex, hourIndex } = this.dayHourIndexFinder.getDayAndHourIndices(day, hour);

        if (dayIndex !== -1 && hourIndex !== -1) {
            const scheduledClass = this.matrix[dayIndex][hourIndex];
            if (scheduledClass instanceof Class) {
                const className = scheduledClass.name.toLocaleUpperCase();
                this.matrix[dayIndex][hourIndex] = null;
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
            const scheduledClass = this.matrix[dayIndexOrigin][hourIndexOrigin];
            if (scheduledClass instanceof Class) {
                const className = scheduledClass.name.toLocaleUpperCase();
                if (this.matrix[dayIndexDestination][hourIndexDestination] === null) {
                    this.matrix[dayIndexDestination][hourIndexDestination] = new Class(className, dayDestination.toUpperCase(), hourDestination);
                    this.matrix[dayIndexOrigin][hourIndexOrigin] = null;
                    console.log(`Class "${className}" moved from ${dayOrigin.toUpperCase()} at ${hourOrigin}:00 to ${dayDestination.toUpperCase()} at ${hourDestination}:00.`);
                } else {
                    console.log(`ERROR: Cannot move class to ${dayDestination.toUpperCase()} at ${hourDestination}:00. Time slot is already booked.`);
                }
            } else {
                console.log(`Error: No class scheduled on ${dayOrigin.toUpperCase()} at ${hourOrigin}:00.`);
            }
        } else {
            console.log(`Error: Invalid day or hour. Please remember that classes can be scheduled from Monday to Saturday, between 7:00 and 16:00.`);
        }
    }

    findClassByName(name: string): Class[] | null {
        const upperName = name.toUpperCase();
        const classesFound: Class[] = this.matrix
            .flatMap(row => row)
            .filter(cls => cls instanceof Class && cls.name === upperName) as Class[];

        if (classesFound.length > 0) {
            const classByName = classesFound.map(cls => ({
                name: cls.name,
                day: cls.day,
                hour: cls.hour
            }));

            console.log(`Classes found for "${upperName}": `);
            classByName.forEach(cls => {
                console.log(`- ${cls.name} on ${cls.day} at ${cls.hour}:00`);
            });

            return classesFound;
        } else {
            console.log(`No classes found for "${upperName}".`);
            return null;
        }
    }

    findClassByDay(day: string, hour: number) {
        const { dayIndex, hourIndex } = this.dayHourIndexFinder.getDayAndHourIndices(day, hour);

        if (dayIndex !== -1 && hourIndex !== -1) {
            const scheduledClass = this.matrix[dayIndex][hourIndex];
            if (scheduledClass instanceof Class) {
                console.log(`Class found: ${scheduledClass.name} on ${day.toUpperCase()} at ${hour}:00`);
            } else {
                console.log(`No class scheduled on ${day.toUpperCase()} at ${hour}:00.`);
            }
        } else {
            console.log(`Error: Invalid day or hour.`);
        }
    }

    printSchedule(): void {
        console.log("Weekly Schedule");
        console.log("-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------");

        const columnWidth = 16;
        const dayColumnWidth = 20;

        let header = "                     | ";
        for (let j = 1; j < this.matrix[0].length; j++) {
            header += `${this.matrix[0][j]?.toString().padEnd(columnWidth)} | `;
        }
        console.log(header);
        console.log("-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------");

        for (let i = 1; i < this.matrix.length; i++) {
            let row = `${this.matrix[i][0]?.toString().padEnd(dayColumnWidth)} | `;
            for (let j = 1; j < this.matrix[i].length; j++) {
                const scheduledClass = this.matrix[i][j];
                if (scheduledClass instanceof Class) {
                    row += `${scheduledClass.name.padEnd(columnWidth)} | `;
                } else {
                    row += " ".repeat(columnWidth) + "| ";
                }
            }
            console.log(row);
            console.log("------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------");
        }
    }
}


const agenda1 = new Agenda(6, 10);
agenda1.bookClass('Soccer', 'monDay', 16);
agenda1.bookClass('Code Class', 'monDay', 7);
agenda1.bookClass('Math', 'tuesday', 7);
agenda1.bookClass('soccer', 'friday', 8);
agenda1.bookClass('History', 'tuesday', 8);
agenda1.bookClass('Science', 'wednesday', 9);
agenda1.bookClass('Art', 'saturday', 16);
agenda1.deleteClass('tuesday', 7);
agenda1.moveClass('monDay', 16, 'tuesday', 7);
agenda1.moveClass('tuesday', 7, 'wednesday', 9);
agenda1.findClassByName('soccer');
agenda1.findClassByName('Dance');
agenda1.findClassByDay('tuesday', 7);
agenda1.findClassByDay('wednesday', 13);
agenda1.printSchedule();
