
import { Schedule } from './schedule';
import { Scheduler } from './scheduler';

const schedule = new Schedule(); // Crear una nueva agenda
const scheduler = new Scheduler(schedule); // Crear un nuevo planificador

// Ejemplos de uso
console.log(scheduler.bookClass('Matemáticas', 'Lunes', 9)); // Reservar una clase
console.log(scheduler.findClassByName('Matemáticas')); // Buscar clase por nombre
console.log(scheduler.deleteClass('Lunes', 9)); // Eliminar clase
console.log(scheduler.moveClass('Lunes', 10, 'Martes', 11)); // Mover clase
console.log(scheduler.findClassByDay('Martes', 11)); // Buscar clase por día y hora
