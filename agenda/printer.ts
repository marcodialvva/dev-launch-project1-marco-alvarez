import { Schedule } from './schedule';
import { Class } from './class';
import { WeekYearHelper } from './helpers';

export class Printer {
    private schedule: Schedule;

    constructor(schedule: Schedule) {
        this.schedule = schedule;
    }

    public printSchedule(): void {
        console.log("Weekly Schedule");
        this.printSeparator();

        const columnWidth = 16;
        const dayColumnWidth = 20;

        this.printHeader(columnWidth);

        for (let i = 1; i < this.schedule.matrix.length; i++) {
            const row: string[] = [];
            const day = this.schedule.matrix[i][0]?.toString() || "Unknown";
            row.push(day.padEnd(dayColumnWidth));
            for (let j = 1; j < this.schedule.matrix[i].length; j++) {
                const scheduledClass = this.schedule.matrix[i][j];
                if (scheduledClass instanceof Class) {
                    row.push(scheduledClass.name.padEnd(columnWidth));
                } else {
                    row.push(" ".repeat(columnWidth));
                }
            }
            this.printRow(row);
        }
    }

private printHeader(columnWidth: number): void {
    const weekYear = WeekYearHelper.getCurrentWeekAndYear();
    const dayColumnWidth = 20;

    let header = weekYear.padEnd(dayColumnWidth) + " | ";

    for (let j = 1; j < this.schedule.matrix[0].length; j++) {
        const headerValue = this.schedule.matrix[0][j]?.toString() || "Unknown";
        header += `${headerValue.padEnd(columnWidth)} | `;
    }

    console.log(header);
    this.printSeparator();
}

    private printRow(row: string[]): void {
        let formattedRow = row.join(" | ") + " |";
        console.log(formattedRow);
        this.printSeparator();
    }

    private printSeparator(): void {
        const totalColumns = this.schedule.matrix[0].length;
        const columnWidth = 16;
        const dayColumnWidth = 20;
        const extraPadding = 3; 
        const extraBorder = 2;
        const totalWidth = dayColumnWidth + (totalColumns - 1) * (columnWidth + extraPadding) + extraBorder;

        console.log('-'.repeat(totalWidth));
    }
}
