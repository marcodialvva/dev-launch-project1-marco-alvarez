
import { Class } from './class'

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


export class WeekYearHelper {
  public static getCurrentWeekAndYear(): string {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const daysPassed = Math.floor((now.getTime() - startOfYear.getTime()) / 86400000);
    const weekNumber = Math.ceil((daysPassed + startOfYear.getDay() + 1) / 7);

    return `Week ${weekNumber} - ${now.getFullYear()}`;
  }
}

export interface FindClassResult {
  classes?: Class[];
  message?: string;
}

export interface FindClassByDayResult {
  class?: Class;
  message?: string;
}