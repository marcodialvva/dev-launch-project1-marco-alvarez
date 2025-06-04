
export class DayHourIndexFinder {
    private matrix: any[][];

    constructor(matrix: any[][]) {
        this.matrix = matrix;
    }
    public getDayAndHourIndices(day: string, hour: number): { dayIndex: number, hourIndex: number } {
        const upperDay = day.toUpperCase();
        const dayIndex = this.matrix.findIndex(row => typeof row[0] === 'string' && row[0].startsWith(upperDay));
        const hourIndex = this.matrix[0].findIndex(col => col === `${hour}:00`);

        return { dayIndex, hourIndex };
    }
}

