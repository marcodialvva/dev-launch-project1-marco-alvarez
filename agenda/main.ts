import { Schedule } from './schedule';
import { Scheduler } from './scheduler';
import { Class } from './class'; // Asegúrate de que esta importación sea correcta


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
    








    // Intentar reservar una clase en un horario ya ocupado
    //console.log(scheduler.bookClass("Physics", "MONDAY", 9)); // Debería dar error porque ya hay una clase a las 9:00

    // Buscar clases por nombre
    //console.log(scheduler.findClassByName("Math")); // Debería devolver la clase "Math"
    //console.log(scheduler.findClassByName("Biology")); // Debería devolver null porque no hay clase "Biology"

    // Buscar clase por día y hora
    //console.log(scheduler.findClassByDay("MONDAY", 9)); // Debería devolver la clase "Math"
    //console.log(scheduler.findClassByDay("TUESDAY", 9)); // Debería devolver "No class scheduled on TUESDAY at 9:00."

    // Eliminar una clase
    //console.log(scheduler.deleteClass("MONDAY", 9)); // Debería eliminar la clase "Math"
    //console.log(scheduler.deleteClass("MONDAY", 9)); // Debería dar error porque ya no hay clase a las 9:00

    // Mover una clase
   // console.log(scheduler.moveClass("MONDAY", 7, "TUESDAY", 8)); // Debería mover la clase "Science" a martes a las 8:00
    //console.log(scheduler.moveClass("MONDAY", 7, "TUESDAY", 9)); // Debería dar error porque no hay clase a las 7:00 para mover

    scheduler.printSchedule(); 
