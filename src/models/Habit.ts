import type { Priority } from "./Priority";
import { Status } from "./Status";
import { Task } from "./Task";

export class Habit extends Task {
    public racha: number;

    constructor(
        id: number,
        nombre: string,
        prioridad: Priority,
        descripcion: string,
        estado: Status = Status.Pendiente,
        completado: boolean = false,
        racha: number = 0,
    ){
        super(id, nombre, prioridad, descripcion ,estado,completado);
        this.racha = racha;
    }

    incrementarRacha():void {
        this.racha += 1;
        this.marcarCompletado();
    }

    romperRacha():void {
        this.racha = 0;
    }

    obtenerDescripcion(): string {
        return `${this.descripcion} (${this.racha} dias de racha)`;
    }
}