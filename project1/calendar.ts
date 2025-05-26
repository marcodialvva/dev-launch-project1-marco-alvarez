class Class {
    constructor(public name: string, public day: string, public hour: number) { }

}


interface IAgenda {
    bookClass(name: string, day: string, hour: number): void;
    deleteClass(day: string, hour: number): void;
    moveClass(dayOrigin: string, hourOrigin: number, dayDestination: string, hourDestination: number): void;
    searchClass(name: string): void;
    printSchedule(): void;
}


const daysOfTheWeek = 6
const hoursOfTheDay = 10

class Agenda implements IAgenda {

    // MATRIX = SCHEDULE
    matrix: (Class | null | string)[][];


    constructor(days: number = daysOfTheWeek, hours: number = hoursOfTheDay) {

        this.matrix = Array.from({ length: days + 1 }, () => Array(hours + 1).fill(null));



        const today = new Date()
        const dayOfWeek = today.getDay()
        const startOfWeek = new Date(today)
        startOfWeek.setDate(today.getDate() - dayOfWeek + 1)

        const weekDays: string[] = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
        for (let i = 1; i < this.matrix.length; i++) {
            const currentDay = new Date(startOfWeek);
            currentDay.setDate(startOfWeek.getDate() + (i - 1));

            this.matrix[i][0] = `${weekDays[i - 1]} ${currentDay.getDate()} ${currentDay.toLocaleString('default', { month: 'long' })}`;
        }
        for (let j = 1; j <= hours; j++) {
            this.matrix[0][j] = `${daysOfTheWeek + j}:00`
        }
        //  console.log(this.matrix);
    }


    bookClass(name: string, day: string, hour: number): boolean {
        const upperDay = day.toUpperCase()


        const dayIndex = this.matrix.findIndex(row => typeof row[0] === 'string' && row[0].startsWith(upperDay))
        const hourIndex = this.matrix[0].findIndex(col => col === `${hour}:00`)


        if (dayIndex !== -1 && hourIndex !== -1) {
            if (this.matrix[dayIndex][hourIndex] === null) {
                this.matrix[dayIndex][hourIndex] = new Class(name, upperDay, hour)
                console.log(`Class "${name}" booked on ${upperDay} at ${hour}:00.`)
                return true;
            } else {
                console.log(`Error: You already booked a class on ${upperDay} at ${hour}:00.`)
            }
        } else {
            console.log(`Error: Invalid day or hour. Please remember that classes can be scheduled from Monday to Saturday, between 7:00 and 16:00.`);

        }
        return false
    }


deleteClass(day: string, hour: number): void {
    const upperDay = day.toUpperCase();

    const dayIndex = this.matrix.findIndex(row => typeof row[0] === 'string' && row[0].startsWith(upperDay));
    const hourIndex = this.matrix[0].findIndex(col => col === `${hour}:00`);

    if (dayIndex !== -1 && hourIndex !== -1) {
        const scheduledClass = this.matrix[dayIndex][hourIndex];
        if (scheduledClass instanceof Class) { 
            const className = scheduledClass.name;
            this.matrix[dayIndex][hourIndex] = null; 
            console.log(`Class "${className}" deleted from ${upperDay} at ${hour}:00.`);
        } else {
            console.log(`Error: No class scheduled on ${upperDay} at ${hour}:00.`);
        }
    } else {
        console.log(`Error: Invalid day or hour.`);
    }
}





    moveClass(dayOrigin: string, hourOrigin: number, dayDestination: string, hourDestination: number): void { }
    searchClass(name: string): void { }
    printSchedule(): void { }

}

``
const agenda1 = new Agenda(6, 10);

agenda1.bookClass('Soccer', 'monDay', 16)
agenda1.bookClass('Code Class', 'monDay', 7)
agenda1.bookClass('Math', 'tuesday', 7)
agenda1.deleteClass('tuesday', 7)