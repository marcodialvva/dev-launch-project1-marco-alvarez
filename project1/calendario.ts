// Clase que representa una clase en la agenda
class Clase {
    constructor(public nombre: string, public dia: number, public hora: number) {}
}

// Interfaz que define los métodos de la agenda
interface TAgenda {
    agendarClase(nombre: string, dia: number, hora: number): void;
    eliminarClase(dia: number, hora: number): void;
    moverClase(diaOrigen: number, horaOrigen: number, diaDestino: number, horaDestino: number): void;
    buscarClase(nombre: string): void;
    imprimirHorario(): void;
}

// Clase que implementa la lógica de la agenda
class AgendaP implements TAgenda {
    private matriz: (Clase | null)[][];

    constructor(dias: number = 5, horas: number = 9) {
        this.matriz = Array.from({ length: dias }, () => Array(horas).fill(null));
    }

    agendarClase(nombre: string, dia: number, hora: number): void {
        if (this.matriz[dia][hora] === null) {
            this.matriz[dia][hora] = new Clase(nombre, dia, hora);
            console.log(`Clase "${nombre}" agendada para el día ${dia + 1} a las ${hora + 7} am.`);
        } else {
            console.log(`Error: Ya hay una clase agendada en el día ${dia + 1} a las ${hora + 7} am.`);
        }
    }

    eliminarClase(dia: number, hora: number): void {
        if (this.matriz[dia][hora] !== null) {
            const nombre = this.matriz[dia][hora]?.nombre;
            this.matriz[dia][hora] = null;
            console.log(`Clase "${nombre}" eliminada del día ${dia + 1} a las ${hora + 7} am.`);
        } else {
            console.log(`No hay clase agendada en el día ${dia + 1} a las ${hora + 7} am.`);
        }
    }

    moverClase(diaOrigen: number, horaOrigen: number, diaDestino: number, horaDestino: number): void {
        if (this.matriz[diaOrigen][horaOrigen] !== null && this.matriz[diaDestino][horaDestino] === null) {
            const clase = this.matriz[diaOrigen][horaOrigen];
            this.matriz[diaDestino][horaDestino] = clase;
            this.matriz[diaOrigen][horaOrigen] = null;
            console.log(`Clase "${clase.nombre}" movida de día ${diaOrigen + 1} a día ${diaDestino + 1} a las ${horaDestino + 7} am.`);
        } else {
            console.log(`Error: No se puede mover la clase o ya hay una clase en el destino.`);
        }
    }

    buscarClase(nombre: string): void {
        for (let dia = 0; dia < this.matriz.length; dia++) {
            for (let hora = 0; hora < this.matriz[dia].length; hora++) {
                if (this.matriz[dia][hora]?.nombre === nombre) {
                    console.log(`Clase "${nombre}" encontrada en el día ${dia + 1} a las ${hora + 7} am.`);
                    return;
                }
            }
        }
        console.log(`Clase "${nombre}" no encontrada.`);
    }

    imprimirHorario(): void {
        const printer = new AgendaPrinter(this.matriz);
        printer.print();
    }
}

// Clase encargada de imprimir el horario
class AgendaPrinter {
    constructor(private matriz: (Clase | null)[][]) {}

    print(): void {
        console.log("Horario:");
        for (let dia = 0; dia < this.matriz.length; dia++) {
            let fila = `Día ${dia + 1}: `;
            for (let hora = 0; hora < this.matriz[dia].length; hora++) {
                fila += this.matriz[dia][hora]?.nombre ? this.matriz[dia][hora]?.nombre : "Libre";
                fila += " | ";
            }
            console.log(fila);
        }
    }
} 

// Ejemplo de uso
const agenda = new AgendaP();
agenda.agendarClase("Matemáticas", 0, 0); // Lunes 7am
agenda.agendarClase("Historia", 1, 1); // Martes 8am
agenda.imprimirHorario();
agenda.buscarClase("Matemáticas");
agenda.moverClase(0, 0, 1, 2); // Mover Matemáticas a Martes 9am
agenda.eliminarClase(1, 2); // Eliminar Matemáticas
agenda.imprimirHorario();

