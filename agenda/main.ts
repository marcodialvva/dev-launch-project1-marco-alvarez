import { Schedule } from './schedule';
import { Scheduler } from './scheduler';
import { Class } from './class'; 


const schedule = new Schedule(); 
const scheduler = new Scheduler(schedule);



    console.log(scheduler.bookClass("Math", "MONDAY", 9));   
    console.log(scheduler.bookClass("Science", "MONDAY", 7)); 
    console.log(scheduler.bookClass("History", "TUESDAY", 8)); 
    console.log(scheduler.bookClass("Art", "SATURDAY", 16));
    console.log(scheduler.bookClass("Physics", "thursday", 13));
    console.log(scheduler.bookClass("soccer", "friday", 10));
    console.log(scheduler.bookClass("Dance", "wednesday", 14)); 
    console.log(scheduler.bookClass("Dance", "friday", 15)); 
    console.log(scheduler.bookClass("Soccer Match", "saTurday", 8));
    console.log(scheduler.bookClass("Code Class", "tuesday", 15));
    console.log(scheduler.bookClass("Math", "tuesday", 15));


    console.log(scheduler.deleteClass('saturday', 16));
    console.log(scheduler.deleteClass('tuesday', 16));
    
    

    console.log(scheduler.moveClass('tuesday', 15, 'wednesday', 11));
    console.log(scheduler.moveClass('tuesday', 8, 'thursday', 13));
    console.log(scheduler.moveClass('friday', 7, 'saturday', 11));


    console.log(scheduler.findClassByName('Dance'));
    console.log(scheduler.findClassByName('spanish'));


    console.log(scheduler.findClassByDay('tuesday', 15));
    console.log(scheduler.findClassByDay('wednesday', 11));
    


    scheduler.printSchedule(); 
